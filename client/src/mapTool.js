import React from "react";
import {MainView, Mapper} from "./components";

const mapTool = () => {
    return (
        <div>
            <MainView sideView = {<Mapper />}/>
        </div>
    )
}

export default mapTool;