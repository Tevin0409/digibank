import { Slot, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import "@/styles/global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Loader from "../components/Loader";
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //if user is authenticated
    if (typeof isAuthenticated == "undefined") router.replace("signin");
    const inApp = segments[0] == "(app)";
    if (isAuthenticated?.authenticated && !inApp) {
      router.replace("(tabs)/home");
    } else if (isAuthenticated?.authenticated == false) {
      //redirect to login
      router.replace("signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <Loader />;
  }
  return (
    <AuthContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="inverted" />
          <MainLayout />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
}
