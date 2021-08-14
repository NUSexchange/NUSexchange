from django.contrib import admin
from .models import Module, ModulePair, University
# Register your models here.

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ['nus_module_code']
    list_filter = ['nus_module_faculty']
    search_fields = ['nus_module_code']
    ordering = ['nus_module_code']

@admin.register(ModulePair)
class ModulePairAdmin(admin.ModelAdmin):
    list_display = ['id', 'nus_module_code', 'partner_module_code', 'partner_university']
    ordering = ['id']
    search_fields = ['nus_module_code','partner_module_code']

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ['partner_university']
    list_filter = ['partner_country']
    search_fields = ['partner_university']
    ordering = ['partner_university']


