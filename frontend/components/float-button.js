import { Pressable, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
const FloatButton = ({ icon, colorScheme, ...rest }) => {
  return (
    <Pressable
      style={
        colorScheme == "dark"
          ? { backgroundColor: colors.gray[600] }
          : { backgroundColor: colors.orange[500] }
      }
      className="px-4 py-3 rounded-full absolute right-7 bottom-12
      gap-1 flex-row items-center"
      {...rest}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={22}
          color={colorScheme == "dark" ? colors.orange[500] : colors.white}
        />
      )}
      <Text
        style={
          colorScheme == "dark"
            ? { color: colors.orange[500] }
            : { color: colors.white }
        }
        className="font-subtitle"
      >
        Deposit
      </Text>
    </Pressable>
  );
};

export default FloatButton;
