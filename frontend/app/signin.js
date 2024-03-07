import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
const SignIn = () => {
  const router = useRouter();
  const accountNumberRef = useRef("");
  const pinRef = useRef("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (!accountNumberRef.current || !pinRef.current) {
      Alert.alert("Sign in", "Please fill all the fields");
      return;
    }
    const userData = {
      accountNumber: accountNumberRef.current,
      pin: pinRef.current,
    };
    setLoading(true);
    const result = await login(userData);
    if (result && result.error) {
      Alert.alert("Signin Failed", result.msg);
    }

    // await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.data.accessToken);
    // console.log("yogi", result.data);
  };
  return (
    <CustomKeyboardView className="flex-1">
      <StatusBar style="dark" />
      {/* Signin Image */}
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-8"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("@/assets/images/login.png")}
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-[#181717] tracking-wider capitalize font-bold text-center "
          >
            Welcome back<Text className="text-[#ea3d3d]">.</Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-[#3c3939] font-light text-lg "
          >
            Sign in to your account
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="credit-card" size={hp(2.7)} />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 text-[#181717]"
                placeholder="Account Number"
                placeholderTextColor={"gray"}
                inputMode="text"
                keyboardType="default"
                onChangeText={(value) => (accountNumberRef.current = value)}
              />
            </View>

            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Octicons name="lock" size={hp(2.7)} />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className=" text-[#181717] flex-1 "
                  placeholder="PIN"
                  placeholderTextColor="gray"
                  textContentType={"password"}
                  secureTextEntry={secureTextEntry}
                  maxLength={10}
                  onChangeText={(value) => (pinRef.current = value)}
                />
                <TouchableOpacity
                  onPress={() => setSecureTextEntry((prev) => !prev)}
                  className="flex-1"
                >
                  {/* <TouchableOpacity> */}
                  <Text className=" font-semibold text-[#932323]">
                    {secureTextEntry ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="flex items-end">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="text-right font-semibold text-[#181717] "
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(10)} />
              </View>
            ) : (
              <Pressable
                style={{ height: hp(6.5) }}
                onPress={handleLogin}
                className="py-3 bg-red-500 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-bold tracking-wide  text-white"
                >
                  Login
                </Text>
              </Pressable>
            )}
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push("signUp")}>
              <Text className="font-semibold text-[#ea3d3d]"> Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
