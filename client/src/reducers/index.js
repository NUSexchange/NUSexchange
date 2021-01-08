import savedModules from "./savedmodules";
import searchModuleOptions from "./searchmoduleoptions";
import universityResults from "./universityResults";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    savedModules: savedModules,
    searchModuleOptions: searchModuleOptions,
    universityResults: universityResults,
})

export default allReducers;