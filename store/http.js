// in here we are creating some helper functions to make http requests(check firebase docs to know which kind of post is required for what type of action)

import axios from "axios";

// we start by sending a post request inorder to create a new piece of datap and a second argument which is the data that we want to store in the database
// and we did'nt use the Id instead because firebase automatically generates a unique id for each piece of data that we store in the database, so we don't need to worry about generating an id ourselves
// (s)const updatedExpense = { ...state[updateableExpenseIndex], ...action.payload }; // this will create a new expense object with the updated values, we are using the spread operator to copy the current expense and then overwrite the values with the new values from the action.payload
export function storeExpense(expenseData) {
  axios.post(
    "https://expensetracker-ebaa0-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  ); //the expenses(we can use any name) and .json(is required by firebase) are the endpoints that we are using to store the data in firebase, the expenses() is the collection name and the .json() is the file name where the data will be stored
}
