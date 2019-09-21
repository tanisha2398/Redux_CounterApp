import * as actionTypes from "../actions/actions";
import { updateObject } from "../utility";
const initialState = {
  results: [],
  persons: []
};
const deleteResult = (state, action) => {
  const newArray = state.results.filter(
    result => result.id !== action.resultElId
  );
  return updateObject(state, { results: newArray });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.result
        })
      };
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);

    case "ADD_PERSON":
      const newPerson = {
        id: Math.random(),
        name: action.personData.name,
        age: action.personData.age
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
