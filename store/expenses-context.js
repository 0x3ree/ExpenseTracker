import { createContext } from "react";

// this is a context that will be used to provide the expenses data to the app, after the expenses,-
// - we then prvide functions which will be used to update the expenses array
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {}, // in here we are using the object destructuring to get the values from the object
  // this is used to add a new expense
  deleteExpense: ({ id }) => {}, // in here we expect the id of the expense. this is used to delete an expense
  updateExpense: (id, { description, amount, date }) => {}, // in here we expect the id of the expense and the new values of the expense. this is used to update an expense
});

function ExpensesContextProvider() {}
