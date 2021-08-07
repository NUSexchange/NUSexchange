import React from "react";
import styles from "./SavedModules.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {MdDelete} from "react-icons/md";
import SearchBar from "./SearchBar/SearchBar";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {removeModule} from "../../../actions";


const SavedModules = () => {

    let currMods = useSelector(store => store.savedModules.selectedModules);
    let dispatch = useDispatch();

    return (
        <Container fluid>
            <Row>
                <SearchBar />
            </Row>
            <Row style = {{marginTop : "20px"}}>
                <div className = {styles.grid}>
                        {currMods.map((mods, index) => <Card body key = {index}>
                                                            <div className = {styles.modBlock}>
                                                                {mods.nus_module_code + " " + mods.nus_module_title}
                                                                <Button variant = "light" onClick = {() => dispatch(removeModule(mods))}><MdDelete/></Button> 
                                                            </div>
                                                        </Card>)}
                </div>
            </Row>
        </Container>
    )
}

export default SavedModules;