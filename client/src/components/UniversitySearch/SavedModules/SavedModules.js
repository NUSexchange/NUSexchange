import React from "react";
import styles from "./SavedModules.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {MdDelete} from "react-icons/md";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {addUniversity} from "../../../actions";
import {removeModuleUniversity} from "../../../actions";
import axios from "axios";


const SavedModules = (props) => {

    let currMods = useSelector(store => store.savedModules.selectedModulesUniversities);
    let dispatch = useDispatch();

    function processResults(universityResults) {
        const processedUniversityResults = [];
    
        for (let university of universityResults) {
          console.log(university["Modules"]);
          const matchingModulesSet = new Set();
          for (let module of university["Modules"]) {
            matchingModulesSet.add(module["Module"]);
          }
    
          const universityWithUniqueModule = {
            "Country" : university["Country"],
            "Modules" : university["Modules"],
            "Total Mappable" : university["Total Mappable"],
            "University" : university["University"],
            "Unique Mappable" : Array.from(matchingModulesSet)
          }
    
          processedUniversityResults.push(universityWithUniqueModule);
    
        }
    
        return processedUniversityResults;
    }

    function fetchModulePairings() {
        let requestObject = {
            "information" : {
                "modules" : [...currMods.map((mods, index) => mods["NUS Module"])],
                "university" : props.university.partner_university
            }
        }
        
        axios.post("/api/single-uni-matched", requestObject)
        .then((response) => {
            let preprocessedData = [];
            for (let key in response.data) {
                preprocessedData.push(response.data[key]);
            }
            dispatch(addUniversity(processResults(preprocessedData)[0]));
        })
        .catch((error) => {
            console.log(error);
        });

    }
    

    return (
         <Col lg = {12} sm = {12} style = {{display : "flex"}}>
            <Container fluid>
                    <Row>
                    <h3>Selected Modules</h3>
                    {currMods.length > 0 ? <Button variant="contained" style = {{marginLeft : "20px"}} onClick = {() => fetchModulePairings()}>Save Selection</Button> : null}
                    </Row>
                    <Row style = {{marginTop : "20px", marginBottom: "20px"}}>
                            <div className = {styles.grid}>
                                    {currMods.map((mods, index) => <Card body key = {index}>
                                                                        <div className = {styles.modBlock}>
                                                                            {mods["NUS Module"] + " " + mods["NUS Title"]}
                                                                            <Button variant = "light" onClick = {() => dispatch(removeModuleUniversity(mods))}><MdDelete/></Button> 
                                                                        </div>
                                                                    </Card>)}
                            </div>
                    </Row>
                </Container>
            </Col>
    )
}

export default SavedModules;