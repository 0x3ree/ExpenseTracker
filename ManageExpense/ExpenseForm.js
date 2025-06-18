import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../components/Ui/Button";
import { getFormattedDate } from "../util/Date";
import { GlobalStyles } from "../constants/Styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  // in here instead of using the useState hook to create a state for each input field, we are using a single state object to hold all the input values
  // this will make it easier to manage the state and update the values
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    }, // we convert the amount to a string so that it can be displayed in the input field
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    }, // we use the getFormattedDate() method to convert the date to a string so that it can be displayed in the input field
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    }, // we use the description from the defaultValues object if it exists, otherwise we set it to an empty string
    // we ste the isValid to true so it doesn't show an error message when the form is first rendered, we will validate the input values when the user submits the form
  });

  //in here the enteredValue is the value that is passed to the function when the text in the input field changes and is provided by react native automatically
  //the inputIdentifier represents the amount, date and description input fields and in here in the setInpute value we are going to make it in a way that keeps the previous values and only updates the value of the input field that is changed
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curentInputs) => {
      return {
        ...curentInputs, // this will copy the current state of the inputs object
        [inputIdentifier]: { value: enteredValue, isValid: true }, // this targets a specific input dynamically
      };
    });
  }
  // in here we want to first collect the input values and then pass them to the onSubmit function, which will be called when the user submits the form
  // we will also pass the input values to the onSubmit function so that it can be used to add or update an expense
  // we will also convert the date string to a date object before passing it to the onSubmit function and also convert the amount to a number
  // this will be called when the user submits the form
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // converting the amount to a number
      date: new Date(inputs.date.value), // converting the date string to a date object
      description: inputs.description.value,
    };

    // VALIDATION CHECKS
    // in here we would validate the input values before calling the onSubmit function with the helper constants
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0; // this will check if the amount is a number and greater than 0
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"; // this will check if the date is a valid date object
    const descriptionIsValid = expenseData.description.trim().length > 0; // this will check if the description is not empty(where by after the .trim removes excess spaces before and after the string and the .length checks the length of the string is =0)

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values.");
      setInputs((curentInputs) => {
        return {
          amount: { value: curentInputs.amount.value, isValid: amountIsValid },
          date: { value: curentInputs.date.value, isValid: dateIsValid },
          description: {
            value: curentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      //show feedback
      return;
    } // if any of the input values are invalid, we will not call the onSubmit function and just return

    onSubmit(expenseData); // this will call the onSubmit function and pass the expenseData object to it
  }
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>New Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="AMOUNT"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // we use the.bind() method to bind the inputChangeHandler function to the input field and pass the inputIdentifier as "amount" and the enteredValue as the value of the input field
            //NOTE: THE .BIND() ACCEPTS THE THIS KEYWORD AS THE FIRST ARGUMENT AND THE SECOND ARGUMENT IS THE VALUE THAT WE WANT TO PASS TO THE FUNCTION. and as for the entered value it's provided and added by react native automatically
            onChangeText: inputChangeHandler.bind(this, "amount"), // this will bind the inputChangeHandler function to the input field and pass the inputIdentifier as "amount" and the enteredValue as the value of the input field
            // this will be called when the text in the input field changes and this is allowed because of the textInputConfig
            value: inputs.amount.value, // this will get the value of the amount input field from the inputs state object
            // this is a two way binding,(to allow us change the inputValue from elsewhere in our component) the value of the input field will be updated when the state changes and vice versa
          }}
        />
        <Input
          style={styles.rowInput}
          label="DATE"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"), // this will bind the inputChangeHandler function to the input field and pass the inputIdentifier as "date" and the enteredValue as the value of the input field
            value: inputs.date.value,
            // this will be called when the text in the input field changes
          }}
        />
      </View>
      <Input
        label="DESCRIPTION"
        invalid={!inputs.description.isValid} // this will be used to show an error message if the description input field is invalid
        textInputConfig={{
          multiline: true,
          // autoCapitalize: "none",
          //autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value, // this will get the value of the description input field from the inputs state object
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input - Please Check Your Entered Data!{" "}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
// the button components was moved from the ManageExpense.js file to this file so that we can use it in the ExpenseForm component and make it reusable

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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.color.error500,
    margin: 8,
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
