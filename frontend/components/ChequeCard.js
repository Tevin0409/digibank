import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
export default function ChequeCard({
  payee,
  chequeNumber,
  amount,
  date,
  status,
}) {
  return (
    <View className="flex-row justify-start space-x-5 gap-4 mt-5 py-2 px-5 bg-neutral-200 border border-gray-200 rounded-xl flex-1">
      <View className="bg-neutral-300 rounded-full p-6 justify-center">
        <MaterialIcons name={"person"} size={25} color={colors.orange["500"]} />
      </View>
      <View className="flex-col space-y-6">
        <View className="">
          {/* Name */}
          <Text className="text-2xl font-subtitle">Payee: {payee}</Text>

          {/* Type */}
          <Text className="text-xl font-subtitle">
            Cheque No: {chequeNumber}
          </Text>
          <Text className="text-lg font-subtitle">Amount: {amount}</Text>
        </View>

        <View className="flex-row justify-between flex-1">
          <Text className="text-sm font-body text-neutral-500">
            {new Date(date).toDateString()}
          </Text>
          <Text className="text-md font-title animate-pulse font-bold text-blue-500">
            .{status}
          </Text>
        </View>
      </View>
    </View>
  );
}
