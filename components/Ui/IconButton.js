import { View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
function IconButton({ icon, size, color, onTap }) {
  return (
    <Pressable
      onPress={onTap}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Entypo name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});
