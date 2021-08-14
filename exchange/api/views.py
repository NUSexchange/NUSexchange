from django.db import models
from django.db.models.fields import NullBooleanField
from django.db.models.query import QuerySet
from .serializers import ModuleSerializer, UniversitySerializer, CountrySerializer
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from .models import Module, University, ModulePair
import json, requests, itertools
from operator import itemgetter
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .pdf import getPdf
from api.nlpscript.main import wrapper
from rest_framework.decorators import api_view, renderer_classes
import os
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
from django.core.files.storage import FileSystemStorage


# Create your views here.
class UniversityPage(generics.ListAPIView):
    serializer_class = UniversitySerializer
    renderer_classes = [JSONRenderer]

    def get_renderer_context(self):
        context = super().get_renderer_context()
        context['indent'] = 4
        return context

    def get_queryset(self):
        queryset = University.objects.all().order_by("partner_university")
        return queryset

class ModulePage(generics.ListAPIView):
    serializer_class = ModuleSerializer
    renderer_classes = [JSONRenderer]

    def get_renderer_context(self):
        context = super().get_renderer_context()
        context['indent'] = 4
        return context
    #returns the list of nus modules(ordered)
    def get_queryset(self):
        queryset = Module.objects.all().order_by("nus_module_code")
        return queryset

class CountryPage(generics.ListAPIView):
    serializer_class = CountrySerializer
    renderer_classes = [JSONRenderer]
    
    def get_renderer_context(self):
        context = super().get_renderer_context()
        context['indent'] = 4
        return context

    def get_queryset(self):
        queryset = University.objects.all().order_by("partner_country").distinct("partner_country")
        return queryset

class UpdateModel(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ModuleSerializer

    def get(self, request, format='None'):

        with open('api/data/data.json', 'r') as f:
            my_json_obj = json.load(f)

        Module.objects.all().delete()

        # reformat mapping
        mapping = {}
        school = sorted(my_json_obj.values(), key=itemgetter('Faculty'))
        for key, value in itertools.groupby(school, key=itemgetter('Faculty')):
            mapping[key] = []
            for i in value:
                module = i.get('NUS Module 1')
                if module not in mapping[key] and module != "":
                    mapping[key].append(module)

        r = requests.get('https://api.nusmods.com/v2/2020-2021/moduleInfo.json')
        r = r.json()

        #reformat api data
        information = {}
        for key, value in itertools.groupby(r, key=itemgetter('moduleCode')):
            information[key] = {}
            for i in value:
                information[key] = i
        #Updates the list of nus modules that can be done on exchange
        for school in mapping:
            for module in mapping[school]:
                if module in information.keys():
                    model = Module()
                    model.nus_module_code = information[module].get('moduleCode')
                    model.nus_module_title = information[module].get('title')
                    model.nus_module_description = information[module].get('description')
                    model.nus_module_faculty = school
                    model.nus_module_credit = float(information[module].get('moduleCredit'))
                    model.save()

        with open('api/data/universitydata.json', 'r') as f:
            my_json_obj = json.load(f)
        #Updates the list of universities
        for countries in my_json_obj:
            for entries in my_json_obj[countries]:
                university = University.objects.filter(partner_university = entries.get('University'))
                if not university.exists():
                    model = University()
                    model.partner_university = entries.get('University')
                    model.partner_information = entries.get('Link')
                    model.partner_country = countries
                    model.save()
        
        #Updates a list of nus modules and the foreign modules that can be mapped
        with open('api/data/data.json', 'r') as f:
            my_json_obj = json.load(f)
        ModulePair.objects.all().delete()
        for mapping in my_json_obj.values():
            if Module.objects.filter(nus_module_code = mapping.get('NUS Module 1')).exists():
                model = ModulePair()
                model.nus_module_code = mapping.get('NUS Module 1')
                model.partner_university = mapping.get('Partner University')
                model.partner_module_code = mapping.get('PU Module 1')
                model.partner_module_title = mapping.get('PU Module 1 Title')
                model.partner_module_credit = mapping.get('PU Mod1 Credits')
                model.nus_module_title = Module.objects.get(nus_module_code = mapping.get('NUS Module 1')).nus_module_title
                model.partner_country = University.objects.get(partner_university = model.partner_university).partner_country
                model.save()

        return Response({'Database updated'}, status=status.HTTP_200_OK)
@csrf_exempt
def getSingleUniMatched(request, *args, **kwargs):
    result = {}
    if request.method == 'POST':
        json_body = json.loads(request.body.decode("utf-8"))
        information = json_body["information"]
        modules = information['modules']
        university = information["university"]
        partner_university = ModulePair.objects.filter(partner_university = university)
        for pu in partner_university:
            if pu.nus_module_code in modules:
                try:
                    result[pu.partner_university]['Total Mappable'] += 1
                except KeyError as err:
                    result[pu.partner_university] = {"University": pu.partner_university,
                                    "Total Mappable": 1,
                                    "Country": pu.partner_country,
                                    "Modules": []}
                finally:
                    mappings = result[pu.partner_university]["Modules"]
                    hasModule = False
                    for item in mappings:
                        if item["Module"] == pu.nus_module_code:
                            hasModule = True
                            break
                        if hasModule:
                            result[pu.partner_university]["Total Mappable"] -= 1
                    item = { "Module": pu.nus_module_code,
                            "Title": pu.nus_module_title,
                            "NUS Credits": Module.objects.get(nus_module_code = pu.nus_module_code).nus_module_credit,
                            "Partner Title": pu.partner_module_title,
                            "Partner Credits": pu.partner_module_credit,
                            "Partner Modules": pu.partner_module_code}
                    result[pu.partner_university]["Modules"].append(item)
    return JsonResponse(result)

@csrf_exempt
def getUniMatched(request, *args, **kwargs):
    result = {}
    if request.method == 'POST':
        json_body = json.loads(request.body.decode("utf-8"))
        infomation = json_body["information"]
        modules = infomation['modules']
        country = infomation['countryFilter']
        for mod in modules:
            if country != "All countries":
                partnerUnis = ModulePair.objects.filter(nus_module_code = mod, partner_country = country)
            else:
                partnerUnis = ModulePair.objects.filter(nus_module_code = mod)
            for pu in partnerUnis:
                try:  # If this fails it means the uni has not been installed in results
                    result[pu.partner_university]['Total Mappable'] += 1
                except KeyError as err:
                    result[pu.partner_university] = {"University": pu.partner_university,
                                  "Total Mappable": 1,
                                  "Country": pu.partner_country,
                                  "Modules": []}
                finally:
                    mappings = result[pu.partner_university]["Modules"]
                    hasModule = False
                    for item in mappings:
                        if item["Module"] == mod:
                            hasModule = True
                            break
                    if hasModule:
                        result[pu.partner_university]["Total Mappable"] -= 1
                    item = {"Module": pu.nus_module_code,
                            "Title": pu.nus_module_title,
                            "NUS Credits": Module.objects.get(nus_module_code = pu.nus_module_code).nus_module_credit,
                            "Partner Title": pu.partner_module_title,
                            "Partner Credits": pu.partner_module_credit,
                            "Partner Modules": pu.partner_module_code}
                    result[pu.partner_university]["Modules"].append(item)
    return JsonResponse(result)
#Takes in a list of nus modules and returns foreign unis and 
#modules that matches the nus modules provided
@csrf_exempt
def getModulePairing(request, *args, **kwargs):
    result = {}
    if request.method =='POST':
        json_body = json.loads(request.body.decode("utf-8"))
        information = json_body["information"]
        university = information["university"]
        faculty = information["faculty"]
        filteredByUniversity = ModulePair.objects.filter(partner_university = university).order_by('nus_module_code')
        result[university] = []
        if faculty == "All":
            for mod in filteredByUniversity:
                item = {
                    "NUS Module":mod.nus_module_code,
                    "NUS Title":mod.nus_module_title,
                    "Partner Module":mod.partner_module_code,
                    "Partner Title":mod.partner_module_title
                }
                result[mod.partner_university].append(item)
        else:
            for mod in filteredByUniversity:
                if Module.objects.filter(nus_module_code = mod.nus_module_code, nus_module_faculty = faculty):
                    item = {
                        "NUS Module":mod.nus_module_code,
                        "NUS Title":mod.nus_module_title,
                        "Partner Module":mod.partner_module_code,
                        "Partner Title":mod.partner_module_title
                    }
                    result[mod.partner_university].append(item)
    if len(result[university]) > 0:
        return JsonResponse(result)
    else:
        return JsonResponse({})

@csrf_exempt
def getPDF(request, *args, **kwargs):
    #get the pdf that is generated using Rishabh code and returns it as a response
    if request.method == "POST":
        fs = FileSystemStorage()
        dest = getPdf.getPdfResult(request.body)
        if fs.exists(dest):
            with fs.open(dest) as pdf:
                response = HttpResponse(pdf, content_type='application/pdf')
                response['Content-Disposition'] = 'attachment; filename="ExchangeForm.pdf"'
            os.remove(dest)
            return response
    return JsonResponse({})
    
#This is the NLP end point
@api_view(['POST'])
def getNLP(request, *args, **kwargs):
    output = []
    if request.method == 'POST':
        json_body = json.loads(request.body.decode("utf-8"))
        nusModule = json_body['nusModule']
        other_description = json_body['otherModule']
        module = Module.objects.filter(nus_module_code = nusModule)
        if module.exists():
            output.append(wrapper(module[0].nus_module_description, other_description))
            return Response(output, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)


        