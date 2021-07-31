import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch} from "react-redux";
import {addModule, changeUniversities} from "../../../../actions";
import {useSelector} from "react-redux";
import axios from 'axios';



export default function SearchBar() {
  
  // Redux Stores
  const dispatch = useDispatch();
  const set = useSelector(store => store.savedModules.moduleSet);
  // TODO: At some point we can remove this. Dont need to go through redux to update this state since it will all be used locally anyway.
  const moduleSearch = useSelector(store => store.savedModules.selectedModules).map(module => module.nus_module_code);
  const countryFilter = useSelector(store => store.searchModuleOptions.country);

  // Local State
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
   * Fetch list of universities that match the module and country requirements of the user.
   * @param {*} requestParameters requestParameters object. 
   */
  function fetchMatchingUniversities(requestParameters) {
    axios.post("/api/university-matched", requestParameters)
    .then((response) => {
      console.log(response);
      dispatch(changeUniversities(response.data));
    })
    .catch((error) => {
      console.log(error);
    })
  }

  /**
   * On mounting the component, fetch all available modules.
   */
  useEffect(() => {
    fetchAllModules();
  }, []);

  /**
   * Whenever the user makes a change in the module selected, 
   * fetch the updated results.
   */
  useEffect(() => {

    const requestParameters = {
      information : { 
        "modules": moduleSearch,
        "countryFilter" : countryFilter
      }
    }

    fetchMatchingUniversities(requestParameters);
    
  }, [moduleSearch, countryFilter, dispatch]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={moduleList}
      getOptionDisabled={(options) => set.has(options.nus_module_title)}
      getOptionLabel={(options) => options.nus_module_code + " " + options.nus_module_title}
      style={{ width: "100%" }}
      onChange= {(e, v) => v != null ? dispatch(addModule(v)) : null }
      renderInput={(params) => <TextField {...params} label="Add Module" variant="outlined" />}
    />
  );
}


