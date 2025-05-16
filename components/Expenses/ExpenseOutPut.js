import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import ExpensesList from "./ExpensesList";
import ExpenseSummary from "./ExpenseSummary";

// in here we get the expeses props(that should be displayd in a list and summarized) which is an array of objects,
// in here we are using a dummy data to test the component

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>; // this is the default content that will be displayed if there are no expenses
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />; // this will display the list of expenses if there are any
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
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
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
