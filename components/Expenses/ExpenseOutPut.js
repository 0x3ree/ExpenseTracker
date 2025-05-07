import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import ExpensesList from "./ExpensesList";
import ExpenseSummary from "./ExpenseSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A jar of OJK",
    amount: 60.15,
    date: new Date("2023-01-01"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 39.99,
    date: new Date("2023-01-02"),
  },
  {
    id: "e3",
    description: "A native attire",
    amount: 19.99,
    date: new Date("2023-01-03"),
  },
  {
    id: "e4",
    description: "A pack of cat food",
    amount: 59.0,
    date: new Date("2023-01-04"),
  },
  {
    id: "e5",
    description: "A pair of shoes",
    amount: 39.99,
    date: new Date("2023-01-05"),
  },

  {
    id: "e6",
    description: "A jar of OJK",
    amount: 60.15,
    date: new Date("2023-01-01"),
  },
  {
    id: "e7",
    description: "A pair of pants",
    amount: 39.99,
    date: new Date("2023-01-02"),
  },
  {
    id: "e8",
    description: "A native attire",
    amount: 19.99,
    date: new Date("2023-01-03"),
  },
  {
    id: "e9",
    description: "A pack of cat food",
    amount: 59.0,
    date: new Date("2023-01-04"),
  },
  {
    id: "e10",
    description: "A pair of shoes",
    amount: 39.99,
    date: new Date("2023-01-05"),
  },
];
// in here we get the expeses props(that should be displayd in a list and summarized) which is an array of objects,
// in here we are using a dummy data to test the component

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
