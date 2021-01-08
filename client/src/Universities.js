import React from "react";
import {MainView} from "./components";
import Jumbotron from "react-bootstrap/Jumbotron";
import {FaKissWinkHeart} from "react-icons/fa";


const comingSoon =  <Jumbotron style = {{height : "100%", display: "flex", alignItems: 'center', justifyContent: 'center', margin: "30px"}}>
                        <h1>Feature Coming Soon! <FaKissWinkHeart /></h1>
                    </Jumbotron>;
 
const Universities = () => {
    return (
        <div>
            <MainView sideView = {comingSoon}/>
        </div>
    )
}

export default Universities;