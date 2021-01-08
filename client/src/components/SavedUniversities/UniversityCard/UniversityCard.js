import React from "react";
import styles from "./UniversityCard.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {removeUniversity} from "../../../actions";

const UniversityCard = (props) => {

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
                    <Button variant="danger" onClick = {() => dispatch(removeUniversity(props.id))}>Remove</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default UniversityCard;