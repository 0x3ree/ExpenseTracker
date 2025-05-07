import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

// in here we can call this fucntion inline in the render prop but rather we call it outside for better readability

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;

  // in here we get the.item from flatlist which is an object labled as item(dummy expenses) by flatlist, that's how we are able to pull out the data from the object
}
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
