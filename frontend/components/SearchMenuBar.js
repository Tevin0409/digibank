import { View, Text, TextInput, Switch } from "react-native";
import React from "react";
import { colors } from "../styles/colors";
import Animated, { FadeInDown } from "react-native-reanimated";
const SearchMenuBar = ({ colorScheme, children }) => {
  return (
    <Animated.View
      style={
        colorScheme == "dark"
          ? {
              backgroundColor: colors.gray[800],
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }
          : {
              backgroundColor: colors.white,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }
      }
      entering={FadeInDown.duration(500).springify().delay(100)}
      className="w-full h-14  rounded-lg p-4 flex-row items-center gap-4"
    >
      {children}
    </Animated.View>
  );
};

const inputField = ({ colorScheme, ...rest }) => {
  return (
    <TextInput
      style={
        colorScheme == "dark"
          ? { color: colors.white, backgroundColor: colors.gray[800] }
          : { color: colors.gray[800], backgroundColor: colors.white }
      }
      className="flex-1 font-normal text-base  "
      placeholderTextColor={
        colorScheme == "dark"
          ? { color: colors.gray[600] }
          : { color: colors.gray[800] }
      }
      cursorColor={colors.blue[600]}
      {...rest}
    />
  );
};

SearchMenuBar.Field = inputField;

export { SearchMenuBar };
