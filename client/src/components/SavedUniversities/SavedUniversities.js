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

const SavedUnis = () => {

    const currUnis = useSelector(store => store.myExchange.universities);
    const savedDetails = useSelector(store => store.pdfDetails);
    const dispatch = useDispatch();


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
            <Form>
                <Row>
                    <Col sm = {12} lg = {4}>
                        <Form.Group as={Col} controlId="formName" onChange = {(e) => dispatch(changeName(e.target.value))}>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" defaultValue = {savedDetails.name} placeholder = "Name" />
                        </Form.Group>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <Form.Group as={Col} controlId="formPrimaryMajor" onChange = {(e) => dispatch(changePrimaryMajor(e.target.value))}>
                            <Form.Label>Primary Major</Form.Label>
                            <Form.Control type="text" defaultValue = {savedDetails.primaryMajor} placeholder = "Primary Major" />
                        </Form.Group>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <Form.Group as={Col} controlId="formStudentID"onChange = {(e) => dispatch(changeStudentID(e.target.value))}>
                            <Form.Label>Student Number</Form.Label>
                            <Form.Control type="text" defaultValue = {savedDetails.studentId} placeholder = "Student ID"/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <hr />
                <CardDeck>
                    {currUnis.length === 0 ? noSavedUnis : hasSavedUnis}
                </CardDeck>
        </Container>
    )
}

export default SavedUnis;