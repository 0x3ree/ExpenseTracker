import { View, Text } from "react-native";
function ExpenseSummary({ periodName }) {
  return (
    <View>
      <Text>{periodName} </Text>
      <Text>Expenses</Text>
    </View>
  );
}

export default ExpenseSummary;
