
const initialState = [];

const universityResults = (state = initialState, action) => {

    switch(action.type){
      case "CHANGE_UNIVERSITIES":
        return updateUniversities(action.payload);
      default:
        return state;
    }
}

function updateUniversities(payload) {
  const finalState = [];

  for (let key in payload) {
    finalState.push(payload[key]);
  }

  return finalState;
}

export default universityResults;
