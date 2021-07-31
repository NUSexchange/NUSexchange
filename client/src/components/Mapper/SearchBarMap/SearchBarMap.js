import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function SearchBarMap(props) {

  return (
    {/* <Autocomplete
      id="combo-box-demo"
      options={structuredModuleContent.sort()}
      getOptionLabel={(options) => options.title + " " + options["NUS Module 1 Title"]}
      style={{ width: "100%" }}
      onChange = {(e, v) => v != null ? props.setNUSmodule(v.title) : null}
      renderInput={(params) => <TextField {...params} label="NUS Module to Compare" variant="outlined" />}
    />  */}
  );
}
