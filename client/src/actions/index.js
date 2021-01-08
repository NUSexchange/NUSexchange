import objectHash from "object-hash";

//ACTION ADD UNIVERSITY
export const addUniversity = (uni) => {
  
    return {
      type : "ADD_MYEXCHANGE",
      payload: {...uni, key : objectHash(uni)}
    }
}

//ACTION REMOVE UNIVERSITY
export const removeUniversity = (university) => {
  return {
    type : "REMOVE_MYEXCHANGE",
    payload: university
  }
}

//ACTION ADD MODULE
export const addModule = (module) => {
  return {
    type : "ADD_MODULE",
    payload: module
  }
}

//ACTION REMOVE MODULE
export const removeModule = (module) => {
  return {
    type : "REMOVE_MODULE",
    payload: module
  }
}

//ACTION FILTER COUNTRY
export const filterCountry = (country) => {
  return {
    type : "FILTER_COUNTRY",
    payload: country
  }
}

//ACTION TOGGLE LANGUAGEREQUIREMENTS
export const toggleLanguageRequirements = () => {
  return {
    type : "TOGGLE_LANGUAGEREQUIREMENTS",
  }
}

//ACTION TOGGLE OVERSUBSCRIBEDUNIS
export const toggleOversubscribedUnis = () => {
  return {
    type : "TOGGLE_OVERSUBSCRIBEDUNIS",
  }
}

//ACTION CHANGE UNIVERSITIES
export const changeUniversities = (universities) => {
    return {
      type : "CHANGE_UNIVERSITIES",
      payload: universities
    }
  }