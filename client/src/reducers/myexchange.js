
  let initialState; 
  let itemInLocalStorage = JSON.parse(localStorage.getItem("savedUniversities"));
  
  if (itemInLocalStorage != null) {
    initialState = itemInLocalStorage;

  } else {
    initialState = {
      universities : [],
      savedHashes : [],
      hashSize : 0
    };
  } 
    
  const addUniversity = (state, uni) => {
    if (state.savedHashes.includes(uni.key)) return {
      universities: state.universities, savedHashes: state.savedHashes, hashSize: state.savedHashes.length
    };
    const newUniversities = [...state.universities, uni];
    const newSavedHashes = [...state.savedHashes, uni.key];
    const newObject = {universities: newUniversities, savedHashes: newSavedHashes, hashSize: newSavedHashes.length};
    localStorage.setItem("savedUniversities", JSON.stringify(newObject));
    return newObject;
  }
  
  const removeUniversity = (state, uni) => {
    const newUniversities = [...state.universities.filter(mod => mod.key !== uni)];
    const newSavedHashes = [...state.savedHashes.filter(mod => mod !== uni)];
    const newObject = {universities: newUniversities, savedHashes: newSavedHashes, hashSize: newSavedHashes.length};
    localStorage.setItem("savedUniversities", JSON.stringify(newObject));
    return newObject;
  }
  
  const myExchange = (state = initialState, action) => {
  
      switch(action.type){
        case "ADD_MYEXCHANGE":
          return addUniversity(state, action.payload);
        case "REMOVE_MYEXCHANGE":
          return removeUniversity(state, action.payload);
        default:
          return state;
      }
  }
  
  export default myExchange;