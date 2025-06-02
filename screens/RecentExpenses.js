import { useState, useContext, useEffect } from "react";
import ExpensesOutput from "../components/Expenses/ExpenseOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusdays } from "../util/Date";
import { fetchExpenses } from "../store/http";

function RecentExpenses() {
  // const expensesCtx = useContext(ExpensesContext);

  //{BACKEND}

  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  // in here when trying to use async functions inside of a useEffect hook, we need to create an inner function and call it inside the useEffect hook, because the useEffect hook does not support async functions directly
  useEffect(() => {
    async function getExpense() {
      const expenses = await fetchExpenses();
      setFetchedExpenses(expenses);
    }
    getExpense();
  }, []);

  // in order to get the recent expenses we are filtering the expenses array to get the expenses that are within the last 7 days
  const recentExpenses = fetchedExpenses.filter((expense) => {
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
