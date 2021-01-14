import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from '@material-ui/core/TextField';
import OptionsBar from "./OptionsBar/OptionsBar";
import ResultTable from "./ResultTable/ResultTable";
import {useDispatch} from "react-redux";
import {filterUniversityResults} from "../../actions";

const UniversitySearch = () => {

    const dispatch = useDispatch();

    return (
        <Container fluid>
            <OptionsBar />
            <hr></hr>
            <Row style = {{display : "flex", justifyContent: "center"}}>
                <Col lg = {12} sm = {12} style = {{display : "flex", justifyContent: "center"}}>
                    <TextField id="outlined-basic" label="Filter Results" variant="outlined" 
                        style={{ width: "100%" }} onChange = {(e => dispatch(filterUniversityResults(e.target.value)))}/>
                </Col>
            </Row>
            <hr></hr>
            <Row style = {{display : "flex", justifyContent: "center"}}>
                <ResultTable/>
            </Row>
        </Container>
    )
}

export default UniversitySearch;