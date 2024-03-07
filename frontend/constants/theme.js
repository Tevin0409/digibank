import { colors } from "@/styles/colors";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: colors.gray[500],
    backgroundColor: colors.gray[500],
    tint: tintColorDark,
    tabBarActiveTintColor: colors.orange[500],
    tabBarInactiveTintColor: colors.gray[400],
  },
};
