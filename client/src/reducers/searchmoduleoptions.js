const initialState = {
    country : "All countries",
    languageRequirements : false,
    oversubscribedUniversities: false
  };
  
  const searchModuleOptions = (state = initialState, action) => {
  
    switch(action.type){
      case "FILTER_COUNTRY":
        return {country: action.payload, languageRequirements: state.languageRequirements,  oversubscribedUniversities: state.oversubscribedUniversities};
      case "TOGGLE_LANGUAGEREQUIREMENTS":
        return {country: state.country, languageRequirements: !state.languageRequirements,  oversubscribedUniversities: state.oversubscribedUniversities};
      case "TOGGLE_OVERSUBSCRIBEDUNIS":
        return {country: state.country, languageRequirements: state.languageRequirements,  oversubscribedUniversities: !state.oversubscribedUniversities};
      default:
        return state;
    }
  }
  
  export default searchModuleOptions;