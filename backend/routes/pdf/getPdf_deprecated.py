from PyPDF2 import PdfFileWriter, PdfFileReader
import io, json, sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import getAscent, stringWidth

# ---------------- INITIALISATION ----------------

# setting up of pdf canvas
packet = io.BytesIO()
infoToAddPdf = canvas.Canvas(packet, pagesize=A4)

# position + font size
PU_UNI_NAME_X, PU_UNI_NAME_Y = 145, 435

NUS_MODULE_CODE_X, NUS_MODULE_CODE_Y = 430, 350
NUS_MODULE_NAME_X, NUS_MODULE_NAME_Y = 500, 350
NUS_CREDIT_X, NUS_CREDIT_Y = 735, 350

PU_MODULE_CODE_X, PU_MODULE_CODE_Y = 45, 350
PU_MODULE_NAME_X, PU_MODULE_NAME_Y = 110, 350
PU_CREDIT_X, PU_CREDIT_Y = 335, 350

yCoordinateAdjustment = 35

TEXT_WRAP_LIMIT = 200
FONT_SIZE = 10


# ----------------- JSON DATA  -----------------

def updateParterUniName(partnerUniName):
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(PU_UNI_NAME_X, PU_UNI_NAME_Y, partnerUniName)

def updateNusCodeInfoPdf(input):
    global NUS_MODULE_CODE_X, NUS_MODULE_CODE_Y
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(NUS_MODULE_CODE_X, NUS_MODULE_CODE_Y, input)
    NUS_MODULE_CODE_Y -= yCoordinateAdjustment

def updateNusCreditIntoPdf(input):
    global NUS_CREDIT_X, NUS_CREDIT_Y
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(NUS_CREDIT_X, NUS_CREDIT_Y, input)
    NUS_CREDIT_Y -= yCoordinateAdjustment

def updateNusNameInfoPdf(input):
    global NUS_MODULE_NAME_Y, NUS_MODULE_NAME_X
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    width = stringWidth(input, "Helvetica", FONT_SIZE)

    if width > TEXT_WRAP_LIMIT:
        NUS_MODULE_NAME_Y += 5

    infoToAddPdf.drawString(NUS_MODULE_NAME_X, NUS_MODULE_NAME_Y, input)

    NUS_MODULE_NAME_Y -= yCoordinateAdjustment

def updatePUCodeInfoPdf(input):
    global PU_MODULE_CODE_Y, PU_MODULE_CODE_X
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(PU_MODULE_CODE_X, PU_MODULE_CODE_Y, input)
    PU_MODULE_CODE_Y -= yCoordinateAdjustment

def updatePUNameInfoPdf(input):
    global PU_MODULE_NAME_Y, PU_MODULE_NAME_X
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    width = stringWidth(input, "Helvetica", FONT_SIZE)

    if width > TEXT_WRAP_LIMIT:
        PU_MODULE_NAME_Y += 5
        infoToAddPdf.drawString(PU_MODULE_NAME_X, PU_MODULE_NAME_Y, input)
    else:
        infoToAddPdf.drawString(PU_MODULE_NAME_X, PU_MODULE_NAME_Y, input)

    PU_MODULE_NAME_Y -= yCoordinateAdjustment

def updatePUCreditIntoPdf(input):
    global PU_CREDIT_X, PU_CREDIT_Y
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(PU_CREDIT_X, PU_CREDIT_Y, input)
    PU_CREDIT_Y -= yCoordinateAdjustment

def parsePartnerModule(partnerModules):
    firstPartnerModule = partnerModules[0]
    updatePUCodeInfoPdf(firstPartnerModule['partnerModuleCode'])
    updatePUCreditIntoPdf(firstPartnerModule['partnerModuleCredit'])
    updatePUNameInfoPdf(firstPartnerModule['partnerModuleTitle'])

def parseMappableModules(mappableModules):
    for mappableModule in mappableModules:
        updateNusCodeInfoPdf(mappableModule['nusModuleCode'])
        updateNusNameInfoPdf(mappableModule['nusModuleTitle'])
        updateNusCreditIntoPdf(mappableModule['nusModuleCredit'])
        parsePartnerModule(mappableModule['partnerModules'])

def updatePersonalInfo(name, matricNumber, major):
    infoToAddPdf.setFont("Helvetica", FONT_SIZE)
    infoToAddPdf.drawString(145, 495, name) # name position
    infoToAddPdf.drawString(145, 465, matricNumber) # matric number position
    infoToAddPdf.drawString(500, 495, major) # major position

def generateSinglePartnerUniPdf(applicantInfo):
    updatePersonalInfo(applicantInfo["name"], applicantInfo["primaryMajor"]
    , applicantInfo["studentId"])
    infoOfPU = applicantInfo["uni"]
    updateParterUniName(infoOfPU['university'])
    parseMappableModules(infoOfPU['nusModuleInfo'])

# ------------ START ---------------------------

applicantInfo = json.loads(sys.argv[1])

# creates and draws all the PU information on a empty Pdf
generateSinglePartnerUniPdf(applicantInfo)
infoToAddPdf.save()

# # ----------------- PDF GENERATION ------------------
# move to the beginning of the StringIO buffer
packet.seek(0)
new_pdf = PdfFileReader(packet)

# read your existing PDF
template = PdfFileReader(open("C:/Users/kishe/Desktop/NUSexchange/backend/routes/pdf/original-proposed-module.pdf", "rb"))
output = PdfFileWriter()

# add the "watermark" (which is the new pdf) on the existing page
page = template.getPage(0) # PageObject
page.mergePage(new_pdf.getPage(0))
output.addPage(page)

# finally, write "output" to a real file
# dest = "/Users/kormi/OneDrive/Desktop/NUS/kms-NUSexchange/client/src/components/pdfgenerator/" + applicantInfo["name"].strip() + " " + applicantInfo["uni"]["university"].strip() + ".pdf"
dest = "C:/Users/kishe/Desktop/NUSexchange/backend/routes/pdf/" + applicantInfo["name"].strip() + " " + applicantInfo["uni"]["university"].strip() + ".pdf"

outputStream = open(dest, "wb")
output.write(outputStream)

outputStream.close()
