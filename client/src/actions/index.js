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

//ACTION ADD MODULE FOR SEARCH BY UNIVERSITY
export const addModuleUniversity = (module) => {
  return {
    type : "ADD_MODULE_UNIVERSITY",
    payload : module
  }
}

//ACTION ADD MODULE FOR SEARCH BY UNIVERSITY
export const removeModuleUniversity = (module) => {
  return {
    type : "REMOVE_MODULE_UNIVERSITY",
    payload : module
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

//ACTION CHANGE NAME
export const changeName = (name) => {
  return {
    type : "CHANGE_NAME",
    payload: name
  }
}

//ACTION CHANGE PRIMARY MAJOR
export const changePrimaryMajor = (primaryMajor) => {
  return {
    type : "CHANGE_PRIMARY_MAJOR",
    payload: primaryMajor
  }
}

//ACTION CHANGE STUDENT ID
export const changeStudentID = (studentId) => {
  return {
    type : "CHANGE_STUDENT_ID",
    payload: studentId
  }
}

//ACTION UPDATE UNIVERSITY RESULTS
export const updateUniversityResults = (universities) => {
  return {
    type : "UPDATE_UNIVERSITY_RESULTS",
    payload: universities
  }
}

//ACTION UPDATE UNIVERSITY RESULTS
export const filterUniversityResults = (filterKeyword) => {
  return {
    type : "FILTER_UNIVERSITY_RESULTS",
    payload: filterKeyword
  }
}
