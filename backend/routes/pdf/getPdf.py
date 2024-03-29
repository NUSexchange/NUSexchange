import pdfrw
import os, json, sys

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'

# ----------------- JSON DATA  -----------------
def updateNusCodeIntoPdf(input, i):
    global form_data
    formEntry = 'Module Code' + str(i) + '_2'
    form_data[formEntry] = input

def updateNusCreditIntoPdf(input, i):
    global form_data
    formEntry = 'NUS MC' + str(i)
    form_data[formEntry] = input

def updateNusNameIntoPdf(input, i):
    global form_data
    formEntry = 'Title of Module' + str(i) + '_2'
    form_data[formEntry] = input

def updatePUCodeIntoPdf(input, i):
    global form_data
    formEntry = 'Module Code' + str(i)
    form_data[formEntry] = input

def updatePUNameIntoPdf(input, i):
    global form_data
    formEntry = 'Title of Module' + str(i)
    form_data[formEntry] = input

def updatePUCreditIntoPdf(input, i):
    global form_data
    formEntry = 'Credits' + str(i)
    form_data[formEntry] = input

def parsePartnerModule(partnerModules, i):
    firstPartnerModule = partnerModules[0]
    if firstPartnerModule:
        updatePUCodeIntoPdf(firstPartnerModule['partnerModuleCode'], i)
        updatePUCreditIntoPdf(firstPartnerModule['partnerModuleCredit'], i)
        updatePUNameIntoPdf(firstPartnerModule['partnerModuleTitle'], i)

def parseMappableModules(mappableModules):
    for i, mappableModule in enumerate(mappableModules):
        updateNusCodeIntoPdf(mappableModule['nusModuleCode'], i)
        updateNusNameIntoPdf(mappableModule['nusModuleTitle'], i)
        updateNusCreditIntoPdf(mappableModule['nusModuleCredit'], i)
        parsePartnerModule(mappableModule['partnerModules'], i)

def updatePersonalInfo(name, matricNumber, major, partnerUni):
    global form_data
    form_data['Student Name'] = name
    form_data['Student No'] = matricNumber
    form_data['Primary Major'] = major
    form_data['Partner University'] = partnerUni

def populateFormData(applicantInfo):
    updatePersonalInfo(applicantInfo["name"], applicantInfo["studentId"],
    applicantInfo["primaryMajor"], applicantInfo["uni"]['university'])
    parseMappableModules(applicantInfo["uni"]['nusModuleInfo'])

def fill_pdf(input_pdf_path, output_pdf_path, data_dict):
    template_pdf = pdfrw.PdfReader(input_pdf_path)
    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        for annotation in annotations:
            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]
                    if key in data_dict.keys():
                        annotation.update(pdfrw.PdfDict(V='{}'.format(data_dict[key])))
                        annotation.update(pdfrw.PdfDict(AP=''))
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
    pdfrw.PdfWriter().write(output_pdf_path, template_pdf)

# Method for debugging to obtain all form fields
def getFormFields():
    template_pdf = pdfrw.PdfReader(os.path.dirname(__file__) + "/form.pdf")
    for page in template_pdf.pages:
        annotations = page[ANNOT_KEY]
        for annotation in annotations:
            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]
                    print(key)

if __name__ == '__main__':
    form_data = {}
    applicantInfo = json.loads(sys.argv[1])
    # Test data: {"uni":{"university":"University of Toronto","location":"Canada","nusModuleInfo":[{"nusModuleCode":"CS2103","nusModuleTitle":"Software Engineering","nusModuleCredit":"0.50","partnerModules":[{},{},{},{},{},{},{},{}]},{"nusModuleCode":"CS2104","nusModuleTitle":"Software Engineering","nusModuleCredit":"0.50","partnerModules":[{},{},{},{},{},{},{},{}]},{"nusModuleCode":"CS2105","nusModuleTitle":"Software Engineering","nusModuleCredit":"0.50","partnerModules":[{},{},{},{},{},{},{},{}]}],"id":"ef808bcc425e272b51997af70e1de0573442ee1f"},"name":"Roger Lim","primaryMajor":"Computer science","studentId":"A0199776Y"}
    populateFormData(applicantInfo)

    dirname = os.path.dirname(__file__)
    input_pdf_path = dirname + "/form.pdf"
    output_pdf_path = dirname + "/" + applicantInfo["name"].strip() + " " + applicantInfo["uni"]["university"].strip() + ".pdf"
    fill_pdf(input_pdf_path, output_pdf_path, form_data)
