import React from "react";
import styles from "./SavedUniversities.module.css";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import UniversityCard from "./UniversityCard/UniversityCard";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import {FaSadCry} from "react-icons/fa";
import {Link} from "react-router-dom";

const SavedUnis = () => {

    const currUnis = useSelector(store => store.myExchange.universities);


    const hasSavedUnis = <div className = {styles.grid}>
                            {currUnis.map(uni => <UniversityCard university = {uni.university} location = {uni.location} nusModuleInfo = {uni.nusModuleInfo} id = {uni.key}/>)}
                        </div>;

    const noSavedUnis = <Jumbotron style = {{width : "100%"}}>
                            <h1>Looks like you haven't saved any universities! <FaSadCry /></h1>
                            <p>
                            Head over to our module search page and discover your best options for exchange!
                            </p>
                            <p>
                            <Link to = "/modules">
                                <Button variant="dark">Let's Go!</Button>
                            </Link>
                            </p>
                        </Jumbotron>

    return (
        <Container fluid style = {{marginTop: "30px"}}>
                <CardDeck>
                    {currUnis.length === 0 ? noSavedUnis : hasSavedUnis}
                </CardDeck>
        </Container>
    )
}

export default SavedUnis;