import { View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangeHandler() {}
  return (
    <View>
      <Input
        label="AMOUNT"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
          // this will be called when the text in the input field changes
        }}
      />
      <Input
        label="DATE"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
          // this will be called when the text in the input field changes
        }}
      />
      <Input
        label="DESCRIPTION"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: "none",
          //autoCorrect: false,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

//---------------------------------------------------------------------------------------------------------------

/*
({ expense, onSave }) {
  const [formData, setFormData] = React.useState(expense || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount || ""}
        onChange={handleChange}
        placeholder="Amount"
      />
      <button type="submit">Save</button>
    </form>
  );
}

*/
