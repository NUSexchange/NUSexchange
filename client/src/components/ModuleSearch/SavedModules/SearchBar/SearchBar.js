import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch} from "react-redux";
import {addModule, changeUniversities} from "../../../../actions";
import {useSelector} from "react-redux";
import {structuredModuleContent} from "./moduleOptions.js";
import axios from 'axios';

// sorry for the 0 swe principles upheld
function processResponse(response) {
  let parseResponse = response[0].replace(/'/g, '"');
  let listOfPartnerUni = JSON.parse(parseResponse);
  let currUniversities = [];
  var nameOfPartnerUni, locationOfPartnerUni;
  for (var i = 0; i< listOfPartnerUni.length; i++) {
    let nusModuleInfo = [];
    for (let [key, value] of Object.entries(listOfPartnerUni[i])) {
      if (key === "University") {
        nameOfPartnerUni = value;
      } else if (key === "Country") {
        locationOfPartnerUni = value;
      } else if (key === "Modules") { 
        for (var j = 0; j < value.length; j++) {
          for (let [infoHeader, info] of Object.entries(value[j])) {
            var nusModuleCode, nusModuleTitle, nusModuleCredit;
            if (infoHeader === "Module") {
              nusModuleCode = info
            } else if (infoHeader === "Title") {
              nusModuleTitle = info
            } else if (infoHeader === "Credits") {
              nusModuleCredit = info
            } else if (infoHeader === "Partner Modules") {
              var partnerModules = [];
              for (var k = 0; k < info.length; k++) {
                var partnerModuleCode, partnerModuleTitle, partnerModuleCredit;
                for (let [partnerInfoHeader, partnerInfo] of Object.entries(info[k])) {
                  if (partnerInfoHeader === "Module Code") {
                    partnerModuleCode = partnerInfo;
                  } else if (partnerInfoHeader === "Module Title") {
                    partnerModuleTitle = partnerInfo;
                  } else if (partnerInfoHeader === "Module Credits") {
                    partnerModuleCredit = partnerInfo
                  }
                }
                partnerModules.push({partnerModuleCode: partnerModuleCode, 
                partnerModuleTitle: partnerModuleTitle, partnerModuleCredit : partnerModuleCredit})
              }
            }
          }
          nusModuleInfo.push({nusModuleCode: nusModuleCode, nusModuleTitle: nusModuleTitle, 
            nusModuleCredit: nusModuleCredit, partnerModules : partnerModules});
        }
      }
    }
    currUniversities.push({"university": nameOfPartnerUni, location : locationOfPartnerUni, nusModuleInfo : nusModuleInfo});
  }

  return currUniversities;
}

export default function SearchBar() {
  
  const dispatch = useDispatch();
  const set = useSelector(store => store.savedModules.moduleSet);
  const moduleSearch = useSelector(store => store.savedModules.selectedModules).map(module => module.title);
  const countryFilter = useSelector(store => store.searchModuleOptions.country)

  useEffect(() => {

    const objectToSendOver = {
      information : { 
        "modules": moduleSearch, 
        "countryFilter": countryFilter
      }
    }

    axios.post("http://localhost:5000/getresults/fetch", objectToSendOver)
    .then(function (response) {
      let newList = processResponse(response.data);
      dispatch(changeUniversities(newList));
    }).catch(function(error) {
      console.log(error);
    })
  }, [moduleSearch, countryFilter, dispatch]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={structuredModuleContent.sort()}
      getOptionDisabled={(options) => set.has(options.title)}
      getOptionLabel={(options) => options.title + " " + options["NUS Module 1 Title"]}
      style={{ width: "100%" }}
      onChange= {(e, v) => v != null ? dispatch(addModule(v)) : null }
      renderInput={(params) => <TextField {...params} label="Add Module" variant="outlined" />}
    /> 
  );
}
