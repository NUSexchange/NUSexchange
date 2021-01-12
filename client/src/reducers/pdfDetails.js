let initialState; 
let itemInLocalStorage = JSON.parse(localStorage.getItem("savedPdfDetails"));

if (itemInLocalStorage != null) {
  initialState = itemInLocalStorage;

} else {
  initialState = {
    name : "",
    primaryMajor : "",
    studentId : "",
};
} 

const setName = (state, newName) => {
  const newObject = {name: newName, primaryMajor : state.primaryMajor, studentId: state.studentId};
  localStorage.setItem("savedPdfDetails", JSON.stringify(newObject));
  return newObject;
}

const setPrimaryMajor = (state, newPrimaryMajor) => {
  const newObject = {name: state.name, primaryMajor : newPrimaryMajor, studentId: state.studentId};
  localStorage.setItem("savedPdfDetails", JSON.stringify(newObject));
  return newObject;
}

const setStudentID = (state, newStudentID) => {
  const newObject = {name: state.name, primaryMajor : state.primaryMajor, studentId: newStudentID};
  localStorage.setItem("savedPdfDetails", JSON.stringify(newObject));
  return newObject;
}

const pdfDetails = (state = initialState, action) => {

    switch(action.type){
      case "CHANGE_NAME":
        return setName(state, action.payload);
      case "CHANGE_PRIMARY_MAJOR":
        return setPrimaryMajor(state, action.payload);
      case "CHANGE_STUDENT_ID":
        return setStudentID(state, action.payload);  
      default:
        return state;
    }
}

export default pdfDetails;