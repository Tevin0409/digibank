import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { useAuth } from "@/context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const IssueChequeScreen = () => {
  const { issueCheque } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [payeeName, setPayeeName] = useState("");
  const [amount, setAmount] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [idate, setIDate] = useState(new Date(1598051730000));
  const [mdate, setMDate] = useState(new Date(1598051730000));

  const onIChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    // setShow(false);
    setIDate(currentDate);
  };
  const onMChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    setMDate(currentDate);
  };

  const handleIssueCheque = async () => {
    if (!payeeName || !amount || !chequeNumber) {
      alert("Please enter payee name and amount.");
      return;
    }
    try {
      setLoading(true);
      const sData = {
        payeeName,
        amount: parseFloat(amount),
        chequeNumber: chequeNumber,
        issueDate: new Date(idate).toISOString(),
        clearanceDate: new Date(mdate).toISOString(),
      };

      // Call the issueCheque function with payeeName and amount
      const result = await issueCheque(sData);
      if (!result.error) {
        alert("Cheque issued successfully!");
        router.push("home");
        setPayeeName(""); // Clear input fields after successful issue
        setAmount("");
        setChequeNumber("");
      } else {
        console.log(result);
        alert("Failed to issue cheque. Please try again.");
      }
    } catch (error) {
      console.error("Error issuing cheque:", error.msg);
      alert("An error occurred while issuing cheque. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(5),
          paddingBottom: hp(15),
          paddingHorizontal: wp(5),
        }}
        className="flex-1 dark:bg-gray-700 bg-white "
      >
        <View className="flex-row justify-start">
          <Pressable
            onPress={() => router.back()}
            className="bg-red-600 p-2 rounded-tr-2xl mt-4 rounded-bl-2xl py-2"
          >
            <MaterialIcons name={"menu"} size={25} color={colors.white} />
          </Pressable>
        </View>
        <View className="flex-1 items-center">
          {colorScheme == "dark" ? (
            <Image
              style={{ height: hp(18), width: wp(40) }}
              resizeMode="contain"
              source={require("@/assets/images/digi-logo-white.png")}
            />
          ) : (
            <Image
              style={{ height: hp(18), width: wp(40) }}
              resizeMode="contain"
              source={require("@/assets/images/digi-logo.png")}
            />
          )}
        </View>
        <View className="flex-1 gap-3">
          <Text
            style={{ fontSize: hp(3.5) }}
            className=" text-[#181717] dark:text-white tracking-wider capitalize font-bold text-left "
          >
            Issue Cheque <Text className="text-[#ea3d3d]">.</Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-[#3c3939] dark:text-white font-light text-lg "
          >
            Enter payee name, cheque details and amount
          </Text>
          <View className="gap-2">
            <TextInput
              style={{
                height: hp(7),
                fontSize: hp(2),
              }}
              className="px-4 dark:text-white text-black bg-neutral-100 dark:bg-neutral-700 border-2 border-red-500 dark:border-gray-500 rounded-xl"
              placeholder="Payee Name"
              placeholderTextColor={"gray"}
              value={payeeName}
              onChangeText={(text) => setPayeeName(text)}
            />
            <TextInput
              style={{
                height: hp(7),
                fontSize: hp(2),
              }}
              className="px-4 dark:text-white text-black bg-neutral-100 dark:bg-neutral-700 border-2 border-red-500 dark:border-gray-500 rounded-xl"
              placeholder="Cheque Number"
              placeholderTextColor={"gray"}
              value={chequeNumber}
              inputMode="numeric"
              keyboardType="default"
              onChangeText={(text) => setChequeNumber(text)}
            />
            <TextInput
              style={{
                height: hp(7),
                fontSize: hp(2),
              }}
              className="px-4 dark:text-white text-black bg-neutral-100 dark:bg-neutral-700 border-2 border-red-500 dark:border-gray-500 rounded-xl"
              placeholder="Amount"
              placeholderTextColor={"gray"}
              inputMode="numeric"
              keyboardType="numbers-and-punctuation"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <View
              style={{
                height: hp(7),
                fontSize: hp(2),
              }}
              className="flex-row w-full dark:text-white  bg-neutral-100 dark:bg-neutral-700 border-2 border-red-500 dark:border-gray-500 px-4 rounded-xl items-center justify-start flex-1"
            >
              <Text
                style={{ fontSize: hp(2) }}
                className="text-[#3c3939] dark:text-white font-light text-left text-lg "
              >
                Issue Date:
              </Text>
              {
                <DateTimePicker
                  testID="dateTimePicker"
                  value={idate}
                  mode={"date"}
                  onChange={onIChange}
                  style={{
                    flexGrow: 1,
                  }}
                  display="default"
                />
              }
            </View>
            <View
              style={{
                height: hp(7),
                fontSize: hp(2),
              }}
              className="flex-row w-full dark:text-white  bg-neutral-100 dark:bg-neutral-700 border-2 border-red-500 dark:border-gray-500 px-4 rounded-xl items-center justify-start flex-1"
            >
              <Text
                style={{ fontSize: hp(2) }}
                className="text-[#3c3939] dark:text-white font-light text-left text-lg "
              >
                Maturity Date:
              </Text>
              {
                <DateTimePicker
                  testID="dateTimePicker"
                  value={mdate}
                  mode={"date"}
                  onChange={onMChange}
                  style={{
                    flexGrow: 1,
                  }}
                  display="default"
                />
              }
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
                onPress={handleIssueCheque}
                className="py-3 bg-red-500 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="font-bold tracking-wide  text-white"
                >
                  Issue Cheque
                </Text>
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => router.push("cheques")}>
            <Text className="font-semibold text-[#ea3d3d]">
              {" "}
              Back to Cheque Menu
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default IssueChequeScreen;
