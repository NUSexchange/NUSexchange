import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "@material-ui/core/Link";
import TextField from '@material-ui/core/TextField';
import OptionsBar from "./OptionsBar/OptionsBar";
import ResultTable from "./ResultTable/ResultTable";
import SavedModules from "./SavedModules/SavedModules";
import {useDispatch} from "react-redux";
import {filterUniversityResults, updateUniversityResults} from "../../actions";
import { Typography } from "@material-ui/core";
import axios from "axios";

const UniversitySearch = () => {

    const dispatch = useDispatch();

    //TODO Should add this to REDUX so we can save the state
    const [selectedUniversity, setSelectedUniversity] = useState("");

    function fetchModulesOfUniversity() {
        
        const targetUniversity = {
            "information" : {
                "university" : selectedUniversity.partner_university,
                "faculty" : "All"
            }
        }


        axios.post("/api/module-pairing", targetUniversity)
            .then((response) => {
                console.log(response.data[selectedUniversity.partner_university] === undefined);
                if (response.data[selectedUniversity.partner_university] !== undefined) {
                    dispatch(updateUniversityResults(response.data[selectedUniversity.partner_university]));
                } else {
                    dispatch(updateUniversityResults([]));
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /**
     * Whenever the user selects a university, we fetch all mappable NUS modules of that university
     */
    useEffect(() => {
        // console.log(selectedUniversity.partner_country);
        // console.log(selectedUniversity.partner_information);
        // console.log(selectedUniversity.partner_university);
        if (selectedUniversity !== "") {
            fetchModulesOfUniversity();
        }

    }, [selectedUniversity]);

    return (
        <Container fluid>
            <OptionsBar setSelectedUniversity = {setSelectedUniversity}/>
            <hr></hr>
            {
                selectedUniversity === ""  
                    ? null 
                    : <React.Fragment>
                        <Typography>
                            <h6>{selectedUniversity.partner_university}</h6>
                            <h6>Location : {selectedUniversity.partner_country}</h6>
                            <Link rel="noopener noreferrer" href={selectedUniversity.partner_information} target="_blank">
                                {selectedUniversity.partner_university} - PDF
                            </Link>
                        </Typography>
                        <hr></hr>
                    </React.Fragment>
            }
            <Row style = {{display : "flex", justifyContent: "center"}}>
                <Col lg = {12} sm = {12} style = {{display : "flex", justifyContent: "center"}}>
                    <TextField id="outlined-basic" label="Filter Results" variant="outlined" 
                        style={{ width: "100%" }} onChange = {(e => dispatch(filterUniversityResults(e.target.value)))}/>
                </Col>
            </Row>
            <hr></hr>
            <Row style = {{display : "flex"}}>
                <ResultTable/>
                <SavedModules university = {selectedUniversity} />
            </Row>
        </Container>
    )
}

export default UniversitySearch;