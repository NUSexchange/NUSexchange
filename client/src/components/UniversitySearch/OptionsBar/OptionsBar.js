import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import {structuredUniversityContent} from "./UniversityList";
import {structuredFacultyContent} from "./FacultyList";


export default function OptionsBar() {

  const [overseasUniversityName, setOverseasUniverstiyName] = useState("");
  const [nusFaculty, setNusFaculty] = useState("All");

  useEffect(() => {
    console.log("Detected Change...");
    console.log(overseasUniversityName);
    console.log(nusFaculty);
    //Insert API call here
    //Once API call done, useDispatch and update the global results state
  }, [overseasUniversityName, nusFaculty]);


  return (
    <Row>
      <Col lg = {6} sm = {12} style = {{display : "flex", justifyContent: "center", marginTop : "30px"}}>
        <Autocomplete
          id="universityList"
          options = {structuredUniversityContent}
          getOptionLabel={(options) => options.universityName}
          style={{ width: "100%" }}
          onChange= {(e) => e.target.innerHTML !== overseasUniversityName ? setOverseasUniverstiyName(e.target.innerHTML) : null}
          renderInput={(params) => <TextField {...params} label="Select University" variant="outlined" />}
        /> 
      </Col>
      <Col lg = {6} sm = {12} style = {{display : "flex", justifyContent: "center", marginTop : "30px"}}>
      <Autocomplete
          id="facultyList"
          options = {structuredFacultyContent}
          getOptionLabel={(options) => options.facultyName}
          style={{ width: "100%" }}
          onChange= {(e) => e.target.innerHTML !== nusFaculty ? setNusFaculty(e.target.innerHTML) : null}
          renderInput={(params) => <TextField {...params} label="Select Faculty" variant="outlined" />}
        /> 
      </Col>
    </Row>
  );
}

