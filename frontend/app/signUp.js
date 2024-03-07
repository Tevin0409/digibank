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
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
const SignUp = () => {
  const router = useRouter();
  const { register } = useAuth();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const accountNumberRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !accountNumberRef.current ||
      !emailRef.current ||
      !passwordRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }
    const userData = {
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
      email: emailRef.current,
      accountNumber: accountNumberRef.current,
      pin: passwordRef.current,
    };
    // setLoading(true);
    const result = await register(userData);
    console.log("kogi", result.data);
    if (result && result.error) {
      alert("SignUp Failed", result.msg);
    }
    alert("SignUp Success");
    router.replace("signin");
  };
  return (
    <CustomKeyboardView className="flex-1">
      <StatusBar style="dark" />
      {/* Signin Image */}
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-2"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(23) }}
            resizeMode="contain"
            source={require("@/assets/images/registration.png")}
          />
        </View>
        <View className="gap-3">
          <Text
            style={{ fontSize: hp(4) }}
            className="text-[#181717] tracking-wider capitalize font-bold text-center "
          >
            We are<Text className="text-[#ea3d3d]"> digibank.</Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-[#3c3939] font-light text-lg "
          >
            Create your account
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="person" size={hp(2.7)} />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 text-[#181717]"
                placeholder="First Name"
                placeholderTextColor={"gray"}
                inputMode="text"
                textContentType="name"
                keyboardType="default"
                onChangeText={(value) => (firstNameRef.current = value)}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="person" size={hp(2.7)} />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 text-[#181717]"
                placeholder="Last Name"
                placeholderTextColor={"gray"}
                inputMode="text"
                textContentType="name"
                keyboardType="default"
                onChangeText={(value) => (lastNameRef.current = value)}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 text-[#181717]"
                placeholder="Email Address"
                placeholderTextColor={"gray"}
                inputMode="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(value) => (emailRef.current = value)}
              />
            </View>
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
                  onChangeText={(value) => (passwordRef.current = value)}
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
                onPress={handleRegister}
                className="py-3 bg-red-500 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-bold tracking-wide  text-white"
                >
                  Sign Up
                </Text>
              </Pressable>
            )}
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("signin")}>
              <Text className="font-semibold text-[#ea3d3d]"> Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
