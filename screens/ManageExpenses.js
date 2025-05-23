import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
import Button from "../components/Ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../ManageExpense/ExpenseForm";

// in here using the ManageScreen to handle both the edit(when we tap an item(added expense)) and add a new expense. so when we click one the edit it shows a different title from when we click add

function ManageExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext); // this will give us access to the expenses context and the functions to update the expenses array
  const editedExpenseId = route.params?.expenseId;
  // the question mark is used to check if the expenseId is undefined or not, if it is undefined it will not throw an error and will just return undefined
  // if it is defined it will return the value of expenseId
  const isEditing = !!editedExpenseId; // this will return true if editedExpenseId is not null or undefined
  // the double negation is used to convert the value to a boolean, so if it is undefined it will return false and if it is defined it will return true
  // this is a common pattern in javascript to convert a value to a boolean

  //**we can update the options of a screen from inside that screen, with the help of the navigation
  //  prop(provided it is a registered screen) with the navigation.setOptions({}) and it is adviced to use this inside of
  //  a useLayoutEffect as to aviod lagging when used alone or with useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    // this will delete the expense from the expenses array
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "edited test",
        amount: 29.99,
        date: new Date("2025-05-22"),
      });
    } else {
      expensesCtx.addExpense({
        description: "added test",
        amount: 19.99,
        date: new Date("2025-05-22"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "update" : "add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <Entypo
            name="trash"
            color={GlobalStyles.color.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.color.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.color.primary200,
    alignItems: "center",
  },
  // was called as a prop in the button component
  // this is used to add extra styles to the button component in the view component
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
