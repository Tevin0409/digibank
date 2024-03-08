import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";

const Cheques = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <View
      style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }}
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
      <View className="items-center">
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
      <View className="gap-10">
        <Text
          style={{ fontSize: hp(3.5) }}
          className="text-[#181717] dark:text-white tracking-wider capitalize font-bold text-left "
        >
          Cheques <Text className="text-[#ea3d3d]">.</Text>
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-[#3c3939] dark:text-white font-light text-lg "
        >
          Manage all your credit operations
        </Text>
        <View className="gap-3">
          <TouchableOpacity
            style={{
              paddingVertical: 4,
            }}
            onPress={() => router.replace("cheques/my-cheques")}
          >
            <View
              className={
                "py-2 flex-row border-b  border-neutral-300 items-center gap-4 h-14 px-6  w-full"
              }
            >
              <MaterialIcons
                name={"read-more"}
                size={28}
                color={colors.orange[500]}
              />
              <Text className="text-gray-600 dark:text-white text-2xl font-heading capitalize ml-4 ">
                View My Cheques
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 6,
            }}
            onPress={() => router.replace("cheques/issue-cheque")}
          >
            <View
              className={
                "py-2 flex-row border-b  border-neutral-300 items-center gap-4 h-14 px-6  w-full"
              }
            >
              <MaterialIcons
                name={"attach-money"}
                size={25}
                color={colors.orange[500]}
              />
              <Text className="text-gray-600 dark:text-white text-2xl font-heading capitalize ml-4 ">
                Issue a Cheque
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 4,
            }}
          >
            <View
              className={
                "py-2 flex-row border-b  border-neutral-300 items-center gap-4 h-14 px-6  w-full"
              }
            >
              <MaterialIcons
                name={"money-off"}
                size={25}
                color={colors.orange[500]}
              />
              <Text className="text-gray-600 dark:text-white text-2xl font-heading capitalize ml-4 ">
                Cancel Cheque
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cheques;
