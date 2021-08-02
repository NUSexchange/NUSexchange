import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";


export default function SearchBarMap(props) {

  const [moduleList, setModuleList] = useState([]);

    /**
   * Fetch list of available modules from the backend.
   */
     function fetchAllModules() {
      axios.get("/api/modulesOptions")
      .then((response) => {
        console.log(response);
        setModuleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };

  /**
   * On mounting the component, fetch all available modules.
   */
  useEffect(() => {
    fetchAllModules();
  }, []);



  return (
    <Autocomplete
        id="combo-box-demo"
        options={moduleList}
        getOptionLabel={(options) => options.nus_module_code + " " + options.nus_module_title}
        style={{ width: "100%" }}
        onChange = {(e, v) => v != null ? props.setNUSmodule(v.nus_module_code) : null}
        renderInput={(params) => <TextField {...params} label="NUS Module to Compare" variant="outlined" />}
    />
  );
}
