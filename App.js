import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import { GlobalStyles } from "./constants/Styles";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./components/Ui/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomScreen() {
  // at the moment we were passing an object to the screenOptions {{}}, we then passed a fucntion ()=>({}) we were then able to use the navigation prop
  // this is a better approach as we can use the navigation prop to navigate to the manage expenses screen
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.color.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.color.primary500 },
        tabBarActiveTintColor: GlobalStyles.color.accent500,
        headerRight: ({ color }) => (
          <IconButton
            icon="add-to-list"
            size={24}
            color={color}
            onTap={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="hour-glass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.color.primary500 },
              headerTintColor: "white",
              //  contentStyle: { backgroundColor: GlobalStyles.color.primary700 },
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={BottomScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{ presentation: "modal" }}
              // we used the presentation: 'modal' to make the screen appear as a modal,which works well for ios but isn't any different for android
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
