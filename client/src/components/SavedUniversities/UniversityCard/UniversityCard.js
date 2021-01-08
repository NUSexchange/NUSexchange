import React from "react";
import styles from "./UniversityCard.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {removeUniversity} from "../../../actions";
import createPdf from "../../../pdfCreator"
import {useSelector} from "react-redux";

const UniversityCard = (props) => {

    const savedDetails = useSelector(store => store.pdfDetails);
    const dispatch = useDispatch();

    return (
        <Card>
            <Card.Body>
                {console.log()}
                <Card.Title>{props.university}</Card.Title>
                <Card.Text>{props.location}</Card.Text>
                <Card.Text>{props.nusModuleInfo.map(mod => mod.nusModuleCode + " ")}</Card.Text>
                <Card.Text>Modules mappable: {" " + props.nusModuleInfo.length}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className = {styles.buttons}>
                    <Button variant="success" onClick = {() => createPdf(props, savedDetails.name, savedDetails.primaryMajor, savedDetails.studentId)}>Export</Button>
                    <Button variant="danger" onClick = {() => dispatch(removeUniversity(props.id))}>Remove</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default UniversityCard;