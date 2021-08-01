import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import axios from "axios";


export default function OptionsBar(props) {

  const [overseasUniversityList, setOverseasUniversityList] = useState([]);
  const [overseasUniversityDisplay, setOverseasUniversityDisplay] = useState([]);
  const [overseasUniversityCountry, setOverseasUniversityCountry] = useState([{partner_country: "All"}]);
  const [filterByCountry, setFilterByCountry] = useState("All");

  /**
   * Fetches a list of overseas partner universities.
   */
  function fetchOverseasUniversities() {
    axios.get("/api/universityOptions")
      .then((response) => {
        console.log(response);
        setOverseasUniversityList(response.data);
        setOverseasUniversityDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Fetches a list of overseas countries that have partner universities with NUS.
   */
  function fetchOverseasUniversityCountries() {
    axios.get("/api/countryOptions")
      .then((response) => {
        console.log(response);
        setOverseasUniversityCountry([...overseasUniversityCountry, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /**
   * On component mount, fetch the list of overseas Universities and countries.
   */
  useEffect(() => {
    fetchOverseasUniversities();
    fetchOverseasUniversityCountries();
  }, []);

  useEffect(() => {
    if (filterByCountry === "All") {
      setOverseasUniversityDisplay(overseasUniversityList);
    } else {
      setOverseasUniversityDisplay(overseasUniversityList.filter((university) => university.partner_country === filterByCountry));
    }
  }, [filterByCountry]);


  return (
    <Row>
      <Col lg = {6} sm = {12} style = {{display : "flex", justifyContent: "center", marginTop : "30px"}}>
        <Autocomplete
          id="universityList"
          options = {overseasUniversityDisplay}
          getOptionLabel={(options) => options.partner_university}
          style={{ width: "100%" }}
          onChange = {(event, value) => value === null ? props.setSelectedUniversity("") : props.setSelectedUniversity(value)}
          renderInput={(params) => <TextField {...params} label="Select University" variant="outlined" />}
        /> 
      </Col>
      <Col lg = {6} sm = {12} style = {{display : "flex", justifyContent: "center", marginTop : "30px"}}>
      <Autocomplete
          id="facultyList"
          options = {overseasUniversityCountry}
          getOptionLabel={(options) => options.partner_country}
          style={{ width: "100%" }}
          onChange = {(event, value) => value === null ? setFilterByCountry("All") : setFilterByCountry(value.partner_country) }
          renderInput={(params) => <TextField {...params} label="Filter University by Country" variant="outlined" />}
        /> 
      </Col>
    </Row>
  );
}



