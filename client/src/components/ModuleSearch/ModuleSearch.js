import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SavedModules from "./SavedModules/SavedModules";
import OptionsBar from "./OptionsBar/OptionsBar";
import ResultTable from "./ResultTable/ResultTable";

const ModuleSearch = () => {
    return (
        <Container fluid style = {{marginTop: "30px", marginBottom : "20px"}}>
            <Row>
                <Col lg = {8}>
                    <Row>
                        <ResultTable />
                    </Row>
                    <hr></hr>
                    <Row>
                        <SavedModules />
                    </Row>
                </Col>
                <Col lg = {4}>
                    <OptionsBar />
                </Col>
            </Row>
        </Container>
    )
}

export default ModuleSearch;