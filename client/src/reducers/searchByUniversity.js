//Once we have a backend to produce data then set both to be empty
const initialState = {
    updatedResults : [],
    currentShownResults : []
}

function filterResults(state, keyword) {

    let filteredView = [];
    if (state.updatedResults.length > 0) {
        filteredView = state.updatedResults.filter(module => module["NUS Module"].toLowerCase().includes(keyword.toLowerCase()) || module["NUS Title"].toLowerCase().includes(keyword.toLowerCase()));
    } else {
        filteredView = [...state.updatedResults]
    }


    return {updatedResults: [...state.updatedResults], currentShownResults : filteredView}
}

const searchByUniversity = (state = initialState, action) => {

    switch(action.type){
      case "UPDATE_UNIVERSITY_RESULTS":
        return {updatedResults: [...action.payload],
            currentShownResults : [...action.payload]};
      case "FILTER_UNIVERSITY_RESULTS":
        return filterResults(state, action.payload);
      default:
        return state;
    }
}

export default searchByUniversity;