import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchBarMap from "./SearchBarMap/SearchBarMap";
import TextField from '@material-ui/core/TextField';
import Button from "react-bootstrap/Button";
import {BiHappyBeaming} from "react-icons/bi";
import {FaSadCry} from "react-icons/fa";
import {ImNeutral2} from "react-icons/im";
import {HiEmojiHappy} from "react-icons/hi";
import {BiError} from "react-icons/bi";
import Jumbotron from "react-bootstrap/Jumbotron"
import axios from 'axios';
import styles from "./Mapper.module.css";
import mingSoon from "../../images/MingSoon.png";
import CircularProgress from '@material-ui/core/CircularProgress';

const noResult = <h1>Select an NUS module to compare with!<BiHappyBeaming /></h1>;

const redBand = <div className = {styles.redBand}>
                    <h1>Oppsie! We've calculated that there's a low chance of mapping this module <FaSadCry /></h1>
                </div>;

const yellowBand = <div className = {styles.yellowBand}>
                        <h1>Hmm... It's somewhat similar so you might have a chance <ImNeutral2/></h1>
                    </div>;

const greenBand = <div className = {styles.greenBand}>
                        <h1>Oh wow! It's pretty similar! You've got a pretty good chance <HiEmojiHappy /></h1>
                    </div>; 

const errorResult = <h1>Oh no! Looks like something went wrong! <BiError /></h1>;

const Loading = <CircularProgress />


const Mapper = () => {
    const [NUSmodule, setNUSmodule] = useState(" ");
    const [OtherModuleText, setOtherModuleText] = useState(" ");
    const [currView, setCurrView] = useState(noResult);

    const updateModuleSelection = (newModule) => {
        setNUSmodule(newModule);
    }

    const updateViewSuccess = (probability) => {
        if (probability < 0.15) {
            setCurrView(redBand);
        } else if (probability < 0.3) {
            setCurrView(yellowBand);
        } else if (probability <= 1) {
            setCurrView(greenBand);
        } else {
            setCurrView(errorResult);
        }
    }

    const updateViewError = () => {
        setCurrView(errorResult);
    }

    function fetchMatchProbability(nusModule, otherModule) {
        let postObject = {
            "nusModule": nusModule, 
            "otherModule": otherModule
        }

        console.log(postObject);
        
        axios.post("/api/nlp", postObject)
        .then((response) => {
            let roundedData = Math.round(response.data[0] * 100) / 100;
            console.log(response.data[0]);
            console.log(roundedData);
            updateViewSuccess(roundedData);
        })
        .catch((error) => {
            updateViewError();
        });
    }

    const calculateProbability = (nusModule, otherModule) => {
        setCurrView(Loading);
        fetchMatchProbability(nusModule, otherModule);
    }

    return (
        <Container fluid style = {{marginTop: "30px", marginBottom : "20px"}}>
            <Row>
                <Col lg = {5}>
                    <form noValidate autoComplete="off">
                        <SearchBarMap setNUSmodule = {updateModuleSelection}/>
                        <hr></hr>
                        <TextField
                        id="outlined-multiline-static"
                        label="Overseas Module Description"
                        multiline
                        rows={20}
                        defaultValue="Overseas Module Description"
                        variant="outlined"
                        fullWidth = {true}
                        onChange = {(e) => setOtherModuleText(e.target.value)}
                        />
                        <hr></hr>
                        <div style = {{display: "flex", justifyContent: "center", marginBottom : "20px"}}>
                            <Button onClick = {() => calculateProbability(NUSmodule, OtherModuleText)} variant="dark">Calculate Probability</Button>
                        </div>
                    </form>
                </Col>
                <Col lg = {7}>
                    <Jumbotron style = {{height : "100%", display: "flex", alignItems: 'center', justifyContent: 'center', marginBottom : "20px"}}>
                            {currView}
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

export default Mapper;