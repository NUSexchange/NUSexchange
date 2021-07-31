import React from "react";
import styles from "./OptionsBar.module.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {filterCountry, toggleLanguageRequirements, toggleOversubscribedUnis} from "../../../actions";

const OptionsBar = () => {
    const dispatch = useDispatch();

    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {styles.header}>
                <h2>Search filters</h2>
            </div>
            <h6>Select Country</h6>
            <Form.Control as="select" onChange = {(e) => dispatch(filterCountry(e.target.value))}>
                <option>All countries</option>
                <option>Australia</option>
                <option>Austria</option>
                <option>Belgium</option>
                <option>Canada</option>
                <option>China</option>
                <option>Denmark</option>
                <option>England</option>
                <option>Estonia</option>
                <option>Finland</option>
                <option>Germany</option>
                <option>Hong Kong</option>
                <option>Hungary</option>
                <option>Ireland</option>
                <option>Israel</option>
                <option>Italy</option>
                <option>Japan</option>
                <option>Mexico</option>
                <option>Netherlands</option>
                <option>New Zealand</option>
                <option>Norway</option>
                <option>Poland</option>
                <option>Scotland</option>
                <option>Singapore</option>
                <option>South Korea</option>
                <option>Spain</option>
                <option>Sweden</option>
                <option>Switzerland</option>
                <option>Taiwan</option>
                <option>Thailand</option>
                <option>Turkey</option>
                <option>USA</option>
            </Form.Control>
            <hr/>            
            {/* <h6>Additional Requirements</h6>
            <Form>
                <div key={`default-checkbox-1`} className="mb-3">
                    <Form.Check 
                        type={"checkbox"}
                        id={`checkbox-1`}
                        label={`No language requirements`}
                        onChange = {() => dispatch(toggleLanguageRequirements())}
                    />
                </div>
                <div key={`default-checkbox-2`} className="mb-3">
                    <Form.Check 
                        type={"checkbox"}
                        id={`checkbox-2`}
                        label={`Exclude previously oversubscribed universities`}
                        onChange = {() => dispatch(toggleOversubscribedUnis())}
                    />
                </div>
            </Form> */}
        </Container>
    )
}

export default OptionsBar;