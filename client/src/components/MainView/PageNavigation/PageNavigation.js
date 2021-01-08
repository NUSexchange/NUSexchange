import React from "react";
import Container from "react-bootstrap/Container";
import LinkButton from "../LinkButton/LinkButton";
import {RiExchangeFill} from "react-icons/ri";
import {BiBook} from "react-icons/bi";
import {FaUniversity} from "react-icons/fa";
import {BsFillPieChartFill} from "react-icons/bs";

const PageNavigation = () => {
    return (
        <Container fluid>
            <LinkButton path = "/myexchange" icon = {<RiExchangeFill size = {34}/>} buttonName = "myExchange" />
            <LinkButton path = "/modules" icon = {<BiBook size = {34}/>} buttonName = "Modules" />
            <LinkButton path = "/universities" icon = {<FaUniversity size = {34}/>} buttonName = "Universities" />
            <LinkButton path = "/maptool" icon = {<BsFillPieChartFill size = {34}/>} buttonName = "mapTool" />
            <hr></hr>
        </Container>
    )
}

export default PageNavigation;
