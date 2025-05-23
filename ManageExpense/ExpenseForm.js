import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  // in here instead of using the useState hook to create a state for each input field, we are using a single state object to hold all the input values
  // this will make it easier to manage the state and update the values
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  //in here the enteredValue is the value that is passed to the function when the text in the input field changes and is provided by react native automatically
  //the inputIdentifier represents the amount, date and description input fields and in here in the setInpute value we are going to make it in a way that keeps the previous values and only updates the value of the input field that is changed
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curentValues) => {
      return {
        ...curentValues,
        [inputIdentifier]: enteredValue, // this targets a specific input dynamically
      };
    });
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>New Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="AMOUNT"
          textInputConfig={{
            keyboardType: "decimal-pad",
            // we use the.bind() method to bind the inputChangeHandler function to the input field and pass the inputIdentifier as "amount" and the enteredValue as the value of the input field
            //NOTE: THE .BIND() ACCEPTS THE THIS KEYWORD AS THE FIRST ARGUMENT AND THE SECOND ARGUMENT IS THE VALUE THAT WE WANT TO PASS TO THE FUNCTION. and as for the entered value it's provided and added by react native automatically
            onChangeText: inputChangeHandler.bind(this, "amount"), // this will bind the inputChangeHandler function to the input field and pass the inputIdentifier as "amount" and the enteredValue as the value of the input field
            // this will be called when the text in the input field changes and this is allowed because of the textInputConfig
            value: inputValues.amount,
            // this is a two way binding,(to allow us change the inputValue from elsewhere in our component) the value of the input field will be updated when the state changes and vice versa
          }}
        />
        <Input
          style={styles.rowInput}
          label="DATE"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"), // this will bind the inputChangeHandler function to the input field and pass the inputIdentifier as "date" and the enteredValue as the value of the input field
            value: inputValues.date,
            // this will be called when the text in the input field changes
          }}
        />
      </View>
      <Input
        label="DESCRIPTION"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: "none",
          //autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});
