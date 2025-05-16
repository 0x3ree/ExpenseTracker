import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpenseOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusdays } from "../util/Date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  // in rder to get the recent expenses we are filtering the expenses array to get the expenses that are within the last 7 days
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date(); //this gets the current date
    const date7DaysAgo = getDateMinusdays(today, 7); // this gets the date 7 days ago
    return expense.date > date7DaysAgo;
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
