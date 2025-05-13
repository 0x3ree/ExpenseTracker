import { StyleSheet, Pressable, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Button({ children, onPress, mode, style }) {
  return (
    // in here we use the style prop  to pass the style from the parent component to the button component(in this case where we might want to
    //  add extra styls to the button component that wasn't added in its original form)
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.color.primary500,
  },
  flat: { backgroundColor: "transparent" },

  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.color.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.color.primary100,
    borderRadius: 4,
  },
});
