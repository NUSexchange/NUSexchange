import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useDispatch} from "react-redux";
import {changeName} from "../../../actions";
import {changePrimaryMajor} from "../../../actions";
import {changeStudentID} from "../../../actions";
import {useSelector} from "react-redux";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { saveAs } from 'file-saver';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    formControlTwo: {
        margin: theme.spacing(1),
        minWidth: 300,
      },
  }));


const FormModal = (props) => {


    const classes = useStyles();
    const savedDetails = useSelector(store => store.pdfDetails);
    const dispatch = useDispatch();

    const [choice, setChoice] = React.useState("1");
    const [academicYear, setAcademicYear] = React.useState("AY2021/2022");
    const [semester, setSemester] = React.useState("NUS Semester 1");
    const [mappings, setMappings] = React.useState({});
    const [mappingRow, setMappingRow] = React.useState([]);

    /**
     * Updates the mapping between a NUS module and it's overseas Module
     * @param {*} nusModuleCode 
     * @param {*} overseasModuleCode 
     */
    function updateMappings(nusModuleCode, overseasModuleCode) {
        let updatedMapping = Object.assign({}, mappings);
        updatedMapping[nusModuleCode] = overseasModuleCode;
        setMappings(updatedMapping);
    }

    /**
     * Creates a dictionay of all the unique modules that are mappable
     * @param {} uniqueModules 
     */
    function createMappings(uniqueModules) {
        let newMappings = {};
        for (let module of uniqueModules) {
            Object.assign(newMappings, {[module] : "Select Module"});
        }
        setMappings(newMappings);
    }

    /**
     * Creates the mapping form for each unique module.
     * @param {*} uniqueModules 
     * @param {*} allMappings 
     */
    function createMappingForm(uniqueModules, allMappings) {
        let mappingRows = [];
        for (let uniqueModule of uniqueModules) {
            let possibleMappings = [];
            for (let mappings of allMappings) {
                if (mappings["Module"] === uniqueModule) {
                    possibleMappings.push(mappings["Partner Modules"]);
                }
            }
            
            const mappingRow = <React.Fragment>
                                    <Row>
                                        <Col sm = {12} lg = {6}>
                                        <TextField
                                            disabled
                                            id="filled-disabled"
                                            label="NUS Module Code"
                                            defaultValue= {uniqueModule}
                                            variant="filled"
                                        />
                                        </Col>
                                        <Col sm = {12} lg = {6}>
                                            <FormControl variant="outlined" className={classes.formControlTwo}>
                                                <InputLabel id="demo-simple-select-filled-label">Overseas Module</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value = {mappings[uniqueModule]}
                                                onChange={(event) => {updateMappings(uniqueModule, event.target.value)}}
                                                label={mappings[uniqueModule]}
                                                >   
                                                <MenuItem value="Select Module" disabled>
                                                    Select Module
                                                </MenuItem>
                                                    {possibleMappings.map(module => <MenuItem value={module}>{module}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>
                               </React.Fragment>

            mappingRows.push(mappingRow);
        }

        setMappingRow(mappingRows);
    }

    function handleExport() {
        //Need to add Error handling
        let moduleInformation = [];
        for (let module of props.university["Modules"]) {
            if (module["Partner Modules"] === mappings[module["Module"]]) {
                let moduleObject = {
                    "nusModuleCode": module["Module"],
                    "nusModuleTitle": module["Title"],
                    "nusModuleCredit": module["NUS Credits"].toString(),
                    "partnerModule": {
                      "partnerModuleCode": module["Partner Modules"],
                      "partnerModuleCredit": module["Partner Credits"],
                      "partnerModuleTitle": module["Partner Title"]
                    }
                }
                moduleInformation.push(moduleObject);
                console.log(moduleObject);
            }
        }

        let pdfRequest = {
            "uni": {
                "university": props.university["University"],
                "moduleInfo": [...moduleInformation]
              },
              "name": savedDetails.name,
              "primaryMajor": savedDetails.primaryMajor,
              "studentId": savedDetails.studentId,
              "acadYear": academicYear,
              "semester": semester,
              "choice": choice          
        }

        // const fileName = savedDetails.name.trim() + " " + props.university["University"] + ".pdf";

        console.log(pdfRequest);

        axios.post("/api/PDF", pdfRequest, { responseType: 'arraybuffer', 
      })
        .then((response) => {
            // console.log(response);
            const file = new Blob([response.data], {
                type: "application/pdf"
              });
            //   //Build a URL from the file
            saveAs(file, 'exchangeForm.pdf');
            
            // Leaving this here just incase 
            // const url = window.URL.createObjectURL(new Blob([response.data]
            //     , {type: "application/pdf"}))
            //   var link = document.createElement('a');
            //   link.href = url;
            //   link.setAttribute('download', "exchangeMapping.pdf");
            //   document.body.appendChild(link);
            //   link.click();
            //   document.body.removeChild(link)

        })
        .catch((error) => {
            console.log(error);
        })
    }

    /**
     * Generates a form when the user clicks on a saved university
     */
    useEffect(() => {
        console.log(props.university);
        createMappings(props.university["Unique Mappable"]);
    }, [props.university])

    /**
     * Whenever the module mappings change, we will update the form.
     */
    useEffect(() => {
        if (Object.keys(mappings).length !== 0) {
            createMappingForm(props.university["Unique Mappable"], props.university["Modules"]);
        }
    }, [mappings]);


    return (
        <React.Fragment>
            <Form>
                <Row>
                    <Col sm = {12} lg = {4}>
                        <TextField id="outlined-search" label="Full Name" type="search" variant="outlined" onChange = {(e) => dispatch(changeName(e.target.value))}/>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <TextField id="outlined-search" label="Primary Major" type="search" variant="outlined" onChange = {(e) => dispatch(changePrimaryMajor(e.target.value))}/>

                    </Col>
                    <Col sm = {12} lg = {4}>
                        <TextField id="outlined-search" label="Matriculation Number" type="search" variant="outlined" onChange = {(e) => dispatch(changeStudentID(e.target.value))}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm = {12} lg = {4}>
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Overseas University"
                            defaultValue= {props.university["University"]}
                            variant="filled"
                        />
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Academic Year</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={academicYear}
                            onChange={(event) => setAcademicYear(event.target.value)}
                            label="Academic Year"
                            >
                                <MenuItem value={"AY2021/2022"}>AY2021/2022</MenuItem>
                                <MenuItem value={"AY2022/2023"}>AY2022/2023</MenuItem>
                                <MenuItem value={"AY2023/2024"}>AY2023/2024</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Semester</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={semester}
                            onChange={(event) => setSemester(event.target.value)}
                            label="Semester"
                            >
                                <MenuItem value={"NUS Semester 1"}>1</MenuItem>
                                <MenuItem value={"NUS Semester 2"}>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm = {12} lg = {12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Choice</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={choice}
                            onChange={(event) => setChoice(event.target.value)}
                            label="Choice"
                            >
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col sm = {12} lg = {12}>
                        {mappingRow}
                    </Col>
                </Row>
                <Row>
                    <Col sm = {12} lg = {12}>
                        <div style = {{display : "flex", justifyContent : "center", marginTop : "20px"}}>
                            <Button variant="success" onClick = {() => handleExport()}>Export</Button>
                        </div>
                    </Col>
                </Row>
        </Form>
        </React.Fragment>
    )
}

export default FormModal;