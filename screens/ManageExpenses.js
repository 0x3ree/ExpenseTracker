import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/Styles";
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

  // in here we want to make our input fields dynamic, so that when we click on an item to edit it, the input fields will be filled with the values of the expense that we want to edit
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

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

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "update" : "add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense} // this will pass the selectedExpense object to the ExpenseForm component, which will be used to fill the input fields with the values of the expense that we want to edit
      />

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
});
