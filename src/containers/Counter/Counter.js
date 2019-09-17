import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../store/actions";
class Counter extends Component {
  state = {
    counter: 0,
    name: "",
    age: ""
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };
  onHandleName = event => {
    this.setState({ name: event.target.value });
  };

  onHandleAge = event => {
    this.setState({ age: event.target.value });
  };
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 15"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.storedResults.map(strResult => (
            <li
              key={strResult.id}
              onClick={() => this.props.onDeleteResult(strResult.id)}
            >
              {strResult.value}
            </li>
          ))}
        </ul>
        <hr />

        <div>
          <input
            type="text"
            placeholder="name"
            onChange={this.onHandleName}
            value={this.state.name}
          />
          <input
            type="number"
            placeholder="age"
            onChange={this.onHandleAge}
            value={this.state.age}
          />
          <button
            onClick={() =>
              this.props.onAddPerson(this.state.name, this.state.age)
            }
          >
            Add Person
          </button>
          {this.props.persons.map(person => (
            <div
              key={person.id}
              onClick={() => this.props.onDeletePerson(person.id)}
            >
              {person.name}
              {person.age}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results,
    persons: state.res.persons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10 }),

    onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
    onStoreResult: result =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onDeleteResult: id =>
      dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
    onAddPerson: (name, age) =>
      dispatch({
        type: "ADD_PERSON",
        personData: { name: name, age: age }
      }),
    onDeletePerson: id => dispatch({ type: "DELETE_PERSON", id: id })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
