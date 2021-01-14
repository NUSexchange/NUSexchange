import React from "react";
import {MainView, UniversitySearch} from "./components";
 
const Universities = () => {
    return (
        <div>
            <MainView sideView = {<UniversitySearch />}/>
        </div>
    )
}

export default Universities;