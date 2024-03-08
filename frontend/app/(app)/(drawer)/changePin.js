import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable, Alert } from "react-native";
import { useAuth } from "@/context/authContext";
import { useColorScheme } from "nativewind";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";
import CustomKeyboardView from "../../../components/CustomKeyboardView";
import { MaterialIcons } from "@expo/vector-icons";
const ChangePinScreen = () => {
  const { changePin, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [cNewPin, setCNewPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePin = async () => {
    if (!oldPin || !newPin) {
      alert("Please enter both old and new pins.");
      return;
    }
    if (newPin !== cNewPin) {
      Alert.alert("Change Pin", "Pins do not match");
    }
    try {
      setLoading(true);
      const pinData = {
        oldPin,
        newPin,
      };
      const result = await changePin(pinData);
      if (!result.error) {
        alert("Pin change successful!");
        logout();
      } else {
        alert("Pin change failed. Please try again.");
      }
    } catch (error) {
      console.error("Error changing pin:", error);
      alert("An error occurred while changing pin. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-8 "
      >
        <View className="flex-1 flex-row justify-start ">
          <Pressable
            onPress={() => router.back()}
            className="bg-red-600 p-2 rounded-tr-2xl rounded-bl-2xl py-2"
          >
            <MaterialIcons name={"menu"} size={25} color={colors.white} />
          </Pressable>
        </View>
        <View className="items-center">
          <Image
            style={{ height: hp(18), width: wp(40) }}
            resizeMode="contain"
            source={require("@/assets/images/digi-logo.png")}
          />
        </View>
        <View className="gap-8">
          <Text
            style={{ fontSize: hp(3.5) }}
            className="text-[#181717] tracking-wider capitalize font-bold text-center "
          >
            Change PIN <Text className="text-[#ea3d3d]">.</Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-[#3c3939] font-light text-lg "
          >
            Enter your old and new PIN
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row border-2 border-red-500 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <TextInput
                style={{
                  fontSize: hp(2),
                }}
                className="flex-1 text-[#181717]"
                placeholder="Old PIN..."
                placeholderTextColor={"gray"}
                inputMode="numeric"
                keyboardType="numbers-and-punctuation"
                secureTextEntry={true}
                value={oldPin}
                onChangeText={(text) => setOldPin(text)}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row border-2 border-red-500 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <TextInput
                style={{
                  fontSize: hp(2),
                }}
                className="flex-1 text-[#181717]"
                placeholder="New PIN..."
                placeholderTextColor={"gray"}
                inputMode="numeric"
                keyboardType="numbers-and-punctuation"
                secureTextEntry={true}
                value={newPin}
                onChangeText={(text) => setNewPin(text)}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row border-2 border-red-500 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <TextInput
                style={{
                  fontSize: hp(2),
                }}
                className="flex-1 text-[#181717]"
                placeholder="Confirm New PIN..."
                placeholderTextColor={"gray"}
                inputMode="numeric"
                keyboardType="numbers-and-punctuation"
                secureTextEntry={true}
                value={cNewPin}
                onChangeText={(text) => setCNewPin(text)}
              />
            </View>
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Text>Loading...</Text>
              </View>
            ) : (
              <Pressable
                style={{ height: hp(6.5) }}
                onPress={handleChangePin}
                className="py-3 bg-red-500 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-bold tracking-wide  text-white"
                >
                  Change PIN
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChangePinScreen;
