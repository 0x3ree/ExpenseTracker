import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/Styles";
// this is the component that will be used to add the input fields, it's a reusable component(costom component for input fields)

// in here we we destructure the Label props so it'll be configureable from outside(dynamic settings)
// in here we wanted using the label, type and maxLength props to make it reusable but that will take a lot of time and too much props instead we used the spread operator to get all the props and use them in the TextInput component
// -so we can use the component in a more dynamic way
function Input({ label, style, textInputConfig }) {
  let inputStyles = [styles.input]; // this will create an array with the styles for the input field
  //check what a refrecence value is
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline); // this will add the styles for the multiline input field to the inputStyles array
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
    // the textInputConfig is the props that we passed to the TextInput component, which is expected to be an object containing the props for the TextInput component
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.color.primary200,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.color.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.color.primary700,
  },
  // for the next we want to make the input field a little bit bigger
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top", // this will make the text start from the top of the input field
  },
});
