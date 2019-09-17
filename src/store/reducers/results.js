import * as actionTypes from "../actions";
const initialState = {
  results: [],
  persons: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: action.result })
      };
    case actionTypes.DELETE_RESULT:
      const newArray = state.results.filter(
        result => result.id !== action.resultElId
      );
      return {
        ...state,
        results: newArray
      };
    case "ADD_PERSON":
      const newPerson = {
        id: Math.random(),
        name: "Tanisha",
        age: Math.floor(Math.random() * 40)
      };
      return {
        ...state,
        persons: state.persons.concat(newPerson)
      };
    case "DELETE_PERSON":
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.id)
      };
  }
  return state;
};
export default reducer;
