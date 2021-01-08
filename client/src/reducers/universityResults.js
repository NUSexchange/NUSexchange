
const initialState = [];

const universityResults = (state = initialState, action) => {

    switch(action.type){
      case "CHANGE_UNIVERSITIES":
        return [...action.payload];
      default:
        return state;
    }
}

export default universityResults;
