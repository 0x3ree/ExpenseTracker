import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpenseOutPut";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext); // here we are using the context to get the expenses data since we are not using it in the component but we are using it in the ExpensesOutput component
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText={"No expenses registered "}
    />
  );
}

export default AllExpenses;
