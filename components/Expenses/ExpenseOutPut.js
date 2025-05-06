import { View, Text } from "react-native";
import ExpensesList from "../components/Expenses/ExpensesList";
import ExpenseSummary from "../components/Expenses/ExpenseSummary";

// in here we get the expeses props(that should be displayd in a list and summarized) which is an array of objects,
function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList />
    </View>
  );
}

export default ExpensesOutput;
