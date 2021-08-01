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
import {removeModuleUniversity} from "../../../actions";


const SavedModules = () => {

    let currMods = useSelector(store => store.savedModules.selectedModulesUniversities);
    let dispatch = useDispatch();


    //TODO: Create function that fetches the uni-module pairing and adds it to my Universities page

    return (
         <Col lg = {12} sm = {12} style = {{display : "flex"}}>
            <Container fluid>
                    <Row>
                    <h3>Selected Modules</h3>
                    {currMods.length > 0 ? <Button variant="contained" style = {{marginLeft : "20px"}}>Save Selection</Button> : null}
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