import { createContext, useReducer } from "react";

// this is a context that will be used to provide the expenses data to the app, after the expenses,-
// - we then prvide functions which will be used to update the expenses array
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {}, // in here we are using the object destructuring to get the values from the object
  // this is used to add a new expense
  setExpenses: (expenses) => {}, // this is used to set the expenses array, we are not using it in this app but we can use it to set the expenses array from the firebase database
  deleteExpense: ({ id }) => {}, // in here we expect the id of the expense. this is used to delete an expense
  updateExpense: (id, { description, amount, date }) => {}, // in here we expect the id of the expense and the new values of the expense. this is used to update an expense
});

// this is the reducer function that will be used to update the expenses array
// this function will take the current state and the action and will return the new state
function expensesReducer(state, action) {
  // the action.type is a property of the action object that specifies the type of operation to perform. it's used to determine which case in the switch statement should be executed, in here the action object has two parts, the type(a string that identifies the action to be performed(e.g 'ADD')) and the payload(additional data required to perform the action (e.g expense details or ID))
  switch (action.type) {
    case "ADD":
      // we dont need this anymore because firebase automatically generates a unique id for each piece of data that we store in the database which we get when we return action.payload, which we would use later in the code to update and delete an expense so we need it to target the correct expense and using ours would cause errors.
      // const id = new Date().toString() + Math.random().toString(); // this will create a unique id for when we add an expense, we are using the current date and a random number to create a unique id

      // this will add a new expense to the expenses array
      return [action.payload, ...state]; // when the dispatch function is called, it will call the reducer function and pass the current state and the action object to the reducer function, the reducer function will then return the new state, in here we are using the spread operator to copy the current state and add the new expense to the beginning of the array
    // the action.payload is the new expense object that we want to add to the expenses array, in here we are using the spread operator to copy the current state and add the new expense to the beginning of the array. This way we don't lose the previous expenses and we can add new expenses to the beginning of the array, so that the most recent expense is at the top of the list
    case "SET":
      const inverted = action.payload.reverse(); // this will reverse the expenses array so that the most recent expense is at the top of the list, we are using the reverse method to reverse the array because firebase returns the data in a chronological order.
      return inverted;
    case "UPDATE":
      // this will update an expense in the expenses array
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      ); // this will find the index of the expense that we want to update. there by getting the index instead of the item itself to again update everything immutably thereafter.
      const updateableExpense = state[updateableExpenseIndex]; // this will get the expense that we want to update
      const updatedItem = { ...updateableExpense, ...action.payload.data }; // this will create a new expense object with the updated values, we are using the spread operator to copy the current expense and then we are using the spread operator again to copy and merge the new values from the action.payload.data object which overrides the old state
      const updatedExpenses = [...state]; // this will create a new array with the updated expense
      updatedExpenses[updateableExpenseIndex] = updatedItem; // this will update the expense in the expenses array
      return updatedExpenses; // this will return the new expenses array with the updated expense
    case "DELETE":
      // this will delete an expense from the expenses array
      return state.filter((expense) => expense.id !== action.payload); // this will filter the expenses array and return a new array without the expense that we want to delete, in here we are using the filter method to create a new array that contains all the expenses except the one with the id that we want to delete
    // the action.payload is the id of the expense that we want to delete,

    default:
      return state;
  }
}

// this fucntion will hold the logic of the context and will be used to provide the context to the app
function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, []); // this will create the expenses array and the dispatch function that will be used to update the expenses array

  // this will be used to add a new expense to the expenses array, this function will take the expenseData object and will dispatch the action to add the new expense to the expenses array
  // the Action is the value passed to the dispatch function, it is an object that contains the type of action to be performed and the payload (the data needed to perform the action)
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); // this will add a new expense to the expenses array and the name(type,payload) is upto you
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses }); // this will set the expenses array to only store the iputed data on firebase database ad use the inputed data to update the expenses array with the added expense so as to save it from having to fetch it again from the firebase database and reload when we already have the data in the context
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id }); // this will delete an expense from the expenses array
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } }); // this will update an expense in the expenses array
  }

  // this will create the context value that will be provided to the app, this value will be used to access the expenses array and the functions to update the expenses array
  // the value is an object that contains the expenses array and the functions to update the expenses array, which will be passed to the provider component
  // the provider component will then pass the value to all the components that are wrapped inside it
  const value = {
    expenses: expenseState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
