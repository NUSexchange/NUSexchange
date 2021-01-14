import myExchange from "./myexchange";
import savedModules from "./savedmodules";
import searchModuleOptions from "./searchmoduleoptions";
import universityResults from "./universityResults";
import pdfDetails from "./pdfDetails";
import searchByUniversity from "./searchByUniversity";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    myExchange: myExchange,
    savedModules: savedModules,
    searchModuleOptions: searchModuleOptions,
    searchByUniversity: searchByUniversity,
    universityResults: universityResults,
    pdfDetails: pdfDetails
})

export default allReducers;