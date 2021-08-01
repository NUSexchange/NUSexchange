import React, {useState, useEffect} from "react";
import styles from "./OptionsBar.module.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {filterCountry, toggleLanguageRequirements, toggleOversubscribedUnis} from "../../../actions";

const OptionsBar = () => {
    const dispatch = useDispatch();

    const [countryList, setCountryList] = useState([<option>All countries</option>]);

   /**
   * Fetches a list of overseas countries that have partner universities with NUS.
   */
    function fetchOverseasUniversityCountries() {
        axios.get("/api/countryOptions")
          .then((response) => {
            console.log(response);
            const fetchedCountries = response.data.map((country) => <option>{country.partner_country}</option>);
            setCountryList([...countryList, ...fetchedCountries]);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      /**
       * On component mount, fetch the list of overseas Universities and countries.
       */
      useEffect(() => {
        fetchOverseasUniversityCountries();
      }, []);

    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {styles.header}>
                <h2>Search filters</h2>
            </div>
            <h6>Select Country</h6>
            <Form.Control as="select" onChange = {(e) => dispatch(filterCountry(e.target.value))}>
                {countryList}
            </Form.Control>
            <hr/>            
        </Container>
    )
}

export default OptionsBar;