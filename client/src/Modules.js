import React from "react";
import {MainView, ModuleSearch} from "./components";

const Modules = () => {
    return (
        <div>
            <MainView sideView = {<ModuleSearch />}/>
        </div>
    )
}

export default Modules;