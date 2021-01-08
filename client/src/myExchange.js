import React from "react";
import {MainView, SavedUniversities} from "./components";

const myExchange = () => {
    return (
        <div>
            <MainView sideView = {<SavedUniversities />}/>
        </div>
    )
}

export default myExchange;