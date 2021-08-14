from django.urls import path
from .views import UpdateModel, UniversityPage, ModulePage, CountryPage, getUniMatched, getModulePairing, getPDF, getNLP, getSingleUniMatched

urlpatterns = [
    #returns a list of all nus modules in the database
    path('modulesOptions', ModulePage.as_view()),
    #Updates the database with new infomation
    path('update-model', UpdateModel.as_view()),
    #Get universities for the dropdown option
    path('universityOptions', UniversityPage.as_view()),
    #Get country for the dropdown option
    path('countryOptions', CountryPage.as_view()),
    #Takes in a list of nus modules and a list of unis with number of mods matched
    path('university-matched', getUniMatched),
    #Takes in a university and faculty and show the mappable mods of the university
    path('module-pairing', getModulePairing),
    path('single-uni-matched', getSingleUniMatched),
    #Generates the pdf
    path('PDF', getPDF),
    #NLP end point
    path('nlp', getNLP),
]
