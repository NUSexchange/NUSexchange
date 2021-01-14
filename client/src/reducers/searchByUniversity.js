//Once we have a backend to produce data then set both to be empty
const initialState = {
    updatedResults : [
        {NUSmodule: "India", OverseasModule :"IN"},
        {NUSmodule: "China", OverseasModule :"CN"},
        {NUSmodule: "Italy", OverseasModule :"IT"},
        {NUSmodule: "United States", OverseasModule :"US"},
        {NUSmodule: "Canada", OverseasModule :"CND"},
        {NUSmodule: "Australia", OverseasModule :"AU"},
        {NUSmodule: "Germany", OverseasModule :"DE"},
        {NUSmodule: "Ireland", OverseasModule :"IE"},
        {NUSmodule: "Mexico", OverseasModule :"MX"},
        {NUSmodule: "Japan", OverseasModule :"JP"},
        {NUSmodule: "United Kingdom", OverseasModule :"GB"},
        {NUSmodule: "Russia", OverseasModule :"RU"},
        {NUSmodule: "Nigeria", OverseasModule :"NG"},
        {NUSmodule: "Brazil", OverseasModule :"BR"}
    ],
    currentShownResults : [
        {NUSmodule: "India", OverseasModule :"IN"},
        {NUSmodule: "China", OverseasModule :"CN"},
        {NUSmodule: "Italy", OverseasModule :"IT"},
        {NUSmodule: "United States", OverseasModule :"US"},
        {NUSmodule: "Canada", OverseasModule :"CND"},
        {NUSmodule: "Australia", OverseasModule :"AU"},
        {NUSmodule: "Germany", OverseasModule :"DE"},
        {NUSmodule: "Ireland", OverseasModule :"IE"},
        {NUSmodule: "Mexico", OverseasModule :"MX"},
        {NUSmodule: "Japan", OverseasModule :"JP"},
        {NUSmodule: "United Kingdom", OverseasModule :"GB"},
        {NUSmodule: "Russia", OverseasModule :"RU"},
        {NUSmodule: "Nigeria", OverseasModule :"NG"},
        {NUSmodule: "Brazil", OverseasModule :"BR"}
    ]
}

function filterResults(state, keyword) {

    let filteredView = [];
    if (state.updatedResults.length > 0) {
        filteredView = state.updatedResults.filter(module => module.NUSmodule.toLowerCase().includes(keyword.toLowerCase()));
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