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
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useDispatch} from "react-redux";
import {changeName} from "../../actions";
import {changePrimaryMajor} from "../../actions";
import {changeStudentID} from "../../actions";

const SavedUniversities = () => {

    const currUnis = useSelector(store => store.myExchange.universities);
    const dispatch = useDispatch();

    const hasSavedUnis = <div className = {styles.grid}>
                            {currUnis.map((uni, index) => <UniversityCard key = {index} university = {uni} location = {uni["Country"]} nusModuleInfo = {uni["Unique Mappable"]} id = {uni.key}/>)}
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
            <h3>Saved University Mappings</h3>
            <hr />
                <CardDeck>
                    {currUnis.length === 0 ? noSavedUnis : hasSavedUnis}
                </CardDeck>
        </Container>
    )
}

export default SavedUniversities;