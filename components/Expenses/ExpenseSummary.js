import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function ExpenseSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodName} </Text>
      <Text style={styles.summaryText}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.color.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontSize: 12,
    color: GlobalStyles.color.primary400,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.color.primary500,
  },
});
