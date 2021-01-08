const initialState = {
    name : "",
    primaryMajor : "",
    studentId : "",
};

const pdfDetails = (state = initialState, action) => {

    switch(action.type){
      case "CHANGE_NAME":
        return {name: action.payload, primaryMajor : state.primaryMajor, studentId: state.studentId};
      case "CHANGE_PRIMARY_MAJOR":
        return {name: state.name, primaryMajor : action.payload, studentId: state.studentId};
      case "CHANGE_STUDENT_ID":
        return {name: state.name, primaryMajor : state.primaryMajor, studentId: action.payload};  
      default:
        return state;
    }
}

export default pdfDetails;