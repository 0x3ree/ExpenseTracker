// in here we are creating some helper functions to make http requests(check firebase docs to know which kind of post is required for what type of action)
// NOTE: *the url in which we are sending data to firebase must be the same as the one we are fetching data from, otherwise it will not work
// in here we had multiple copy and paste of the same url which could become deficult say we were to change the url in the future(the first part is the most useful, because the other part might be diffrent for different request but the first part doesn't), so we can create a variable to hold the url and use it in all the requests
// (s) we are not using the deleteExpense function from the context because we want to delete the expense from the firebase database as well
import axios from "axios";

const BACKEND_URL = "https://expensetracker-ebaa0-default-rtdb.firebaseio.com";
// we start by sending a post request inorder to create a new piece of datap and a second argument which is the data that we want to store in the database
// and we did'nt use the Id instead because firebase automatically generates a unique id for each piece of data that we store in the database, so we don't need to worry about generating an id ourselves
// (s)const updatedExpense = { ...state[updateableExpenseIndex], ...action.payload }; // this will create a new expense object with the updated values, we are using the spread operator to copy the current expense and then overwrite the values with the new values from the action.payload
// here when we send data(add new expense) firebase gives us the ID in response to the post request, so we can use it to update or delete the expense later on, so we can use the response from the post request to get the id of the expense that we just added

//POST REQUEST
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  ); //the expenses(we can use any name) and .json(is required by firebase) are the endpoints that we are using to store the data in firebase, the expenses() is the collection name and the .json() is the file name where the data will be stored
  const id = response.data.name; // this will give us the unique id that firebase generates for each piece of data that we store in the database, so we can use it to update or delete the expense later on
  return id; // this will return the id of the expense that we just added, so our storeexpense function can return(a promise because its an async func and wherever it's called would also be transformed into an async func) the id of the expense that we just added, so we can use it to update or delete the expense later on
}

// in here we are going to fetch some data from the firebase database, and we are going to use the get method of axios to do that
// in here the url we use to fetch data from FB  must be the same as the one we used to store the data in the database, otherwise it will not work
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  // when it comes to using the response gotten from the firebase backend(where each key is a unque id and each value is the expense data) will be an object  where the unique ids will be keys(property names in the object)with nested objects in the unique ids/keys which hold the actual data , we need to convert the data into an array of objects, because firebase returns the data in an object format, so we need to convert it into an array of objects
  //you convert the object to an arrayso you can eaisly display, update , and manage our expenses in the app!
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key, // this is the unique id that firebase generates for each piece of data that we store in the database
      amount: response.data[key].amount, // this will access the amount property of the expense object using the key
      date: new Date(response.data[key].date), // we convert the date string to a Date object, so that we can use it in our app and in firebase the date is stored as a string, so we need to convert it to a Date object to use it in our app
      description: response.data[key].description,
    };
    expenses.push(expenseObj); // this will push the expense object into the expenses array
  }
  // axios gives us a data property in the response object which contains the data that we fetched from the database, so we can access the data using response.data
  return expenses; // this will return the expenses array which contains all the expenses that we fetched from the database
}
