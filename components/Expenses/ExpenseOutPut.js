import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import ExpensesList from "./ExpensesList";
import ExpenseSummary from "./ExpenseSummary";

// in here we get the expeses props(that should be displayd in a list and summarized) which is an array of objects,
// in here we are using a dummy data to test the component

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
  // we used the view here to be able to edit/add styles/manipulate the final output of the component
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.color.primary700,
    flex: 1,
  },
});
