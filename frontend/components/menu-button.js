import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "@/styles/colors";
const MenuButton = ({ colorScheme }) => {
  const navigation = useNavigation();
  const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <Pressable onPress={toggleMenu}>
      <MaterialIcons
        name="menu"
        size={hp(2.7)}
        color={colorScheme == "dark" ? colors.white : colors.gray[900]}
      />
    </Pressable>
  );
};

export default MenuButton;
