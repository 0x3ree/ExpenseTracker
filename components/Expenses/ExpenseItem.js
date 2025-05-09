import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/Styles";
import { getFormattedDate } from "../../util/Date";

function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    // in here in order to be able to know which title appears when we click to edit an expense we need to pass an
    // information to the manage screen the id of the expense we are trying to edit so as to use it to load the data,
    // we do this by adding a second parameter in this case to the navigate function
    // the reason we dont add this to the addIcon is because it doesnt have an id to pass to the manage screen as it's a new expense
    navigation.navigate("ManageExpenses", { expenseId: id });
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.color.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    /* for IOS
      shadowColor: GlobalStyles.color.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:0.4
    */
  },

  textBase: {
    color: GlobalStyles.color.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: GlobalStyles.color.primary500,
    fontWeight: "bold",
  },
});
