import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import SearchScreen from "./src/screens/SearchScreen";
import ResultShowScreen from "./src/screens/ResultShowScreen";
import LocationScreen from "./src/screens/LocationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ReservationScreen from "./src/screens/ReservationScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import QRCodeScannerScreen from "./src/screens/QRCodeScannerScreen";

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded, error] = useFonts({
    CustomFont: require("./assets/fonts/KaushanScript-Regular.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "Foodie Haven",
          headerTitleStyle: { fontFamily: "CustomFont", fontSize: 24 },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ResultShow" component={ResultShowScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
