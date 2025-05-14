import { createContext, useReducer } from "react";

// this is a context that will be used to provide the expenses data to the app, after the expenses,-
// - we then prvide functions which will be used to update the expenses array
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {}, // in here we are using the object destructuring to get the values from the object
  // this is used to add a new expense
  deleteExpense: ({ id }) => {}, // in here we expect the id of the expense. this is used to delete an expense
  updateExpense: (id, { description, amount, date }) => {}, // in here we expect the id of the expense and the new values of the expense. this is used to update an expense
});

// this is the reducer function that will be used to update the expenses array
// this function will take the current state and the action and will return the new state
function expensesReducer(state, action) {
  // the action.type is a property of the action object that specifies the type of operation to perform. it's used to determine which case in the switch statement should be executed, in here the action object has two parts, the type(a string that identifies the action to be performed(e.g 'ADD')) and the payload(additional data required to perform the action (e.g expense details or ID))
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString(); // this will create a unique id for the expense, we are using the current date and a random number to create a unique id

      // this will add a new expense to the expenses array
      return [{ ...action.payload }, ...state]; // when the dispatch function is called, it will call the reducer function and pass the current state and the action object to the reducer function, the reducer function will then return the new state, in here we are using the spread operator to copy the current state and add the new expense to the beginning of the array
    // the action.payload is the new expense object that we want to add to the expenses array, in here we are using the spread operator to copy the current state and add the new expense to the beginning of the array. This way we don't lose the previous expenses and we can add new expenses to the beginning of the array, so that the most recent expense is at the top of the list

    case "DELETE":
    // this will delete an expense from the expenses array

    case "UPDATE":
    // this will update an expense in the expenses array

    default:
      return state;
  }
}

// this fucntion will hold the logic of the context and will be used to provide the context to the app
function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer); // this will create the expenses array and the dispatch function that will be used to update the expenses array

  // this will be used to add a new expense to the expenses array, this function will take the expenseData object and will dispatch the action to add the new expense to the expenses array
  // the Action is the value passed to the dispatch function, it is an object that contains the type of action to be performed and the payload (the data needed to perform the action)
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); // this will add a new expense to the expenses array and the name(type,payload) is upto you
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id }); // this will delete an expense from the expenses array
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } }); // this will update an expense in the expenses array
  }

  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
