import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/Expenses/ExpenseOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusdays } from "../util/Date";
import { fetchExpenses } from "../store/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  //{BACKEND}
  // we already have the expenses context rather than fetching it again from fire base it only stores it when we add a new expense and update the iputed data as the expenses/array in the context as (setExpenses), so we can use the context to get the expenses array and the functions to update the expenses array, so that we can use them in this component rather than having to fetch it from the firebase database every time we want to use it
  // we also used the context to get the expenses array and the functions to update the expenses array, so that we can use them in this component rather than havng to fetch it from the firebase database every time we want to use it so we updated the state of the context with the expenses that we fetched from the firebase database
  // (s)we are using the useEffect hook to fetch the expenses from the firebase database when the component mounts, and we are using an async function to do that, but we can't use async functions directly inside of a useEffect hook, so we need to create an inner function and call it inside the useEffect hook
  // in here when trying to use async functions inside of a useEffect hook, we need to create an inner function and call it inside the useEffect hook, because the useEffect hook does not support async functions directly
  useEffect(() => {
    async function getExpense() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses); // this will set the expenses array in the context with the expenses that we fetched from the firebase database
    }
    getExpense();
  }, []);

  // in order to get the recent expenses we are filtering the expenses array to get the expenses that are within the last 7 days
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date(); //this gets the current date
    const date7DaysAgo = getDateMinusdays(today, 7); // this gets the date 7 days ago
    return expense.date >= date7DaysAgo && expense.date <= today; // this filters the expenses to get the ones that are within the last 7 days
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText={"No expenses in the last 7 days "}
    />
  );
}

export default RecentExpenses;
