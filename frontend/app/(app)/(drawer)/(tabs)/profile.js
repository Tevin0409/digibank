import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@/components/BottomSheet";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Button from "@/components/Button";

import { View, Text, Pressable, Image, useColorScheme } from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    logout();
    router.replace("login");
  };

  const handleChangePin = () => {
    router.push("change-pin");
  };

  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);

  const [theme, setTheme] = useState(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState("system");

  useEffect(() => {
    if (themeSwitch === "system") {
      setTheme(colorScheme);
    }
  }, [colorScheme, themeSwitch]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("black") : withTiming("white"),
    };
  });
  const backgroundAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === "dark" ? withTiming("#ea3d3d") : withTiming("#22272B"),
    };
  });

  const bTextColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withTiming("white") : withTiming("#F6AEA9"),
    };
  });
  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === "dark" ? withTiming("white") : withTiming("#000"),
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: colors.white,
        },
        backgroundColorAnimation,
      ]}
    >
      <View style={{ width: "100%" }}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/white-technology-background_23-2148405985.jpg?w=996",
          }}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: "https://github.com/tevin0409.png" }}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: colors.orange[500],
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        <Animated.Text
          style={[
            {
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 8,
            },
            textColorAnimation,
          ]}
        >
          {user.fullName}
        </Animated.Text>
        <Animated.Text
          style={[
            {
              fontSize: 18,
              fontWeight: "500",
            },
            textColorAnimation,
          ]}
        >
          Email: {user.email}
        </Animated.Text>
        <Animated.Text
          style={[
            {
              fontSize: 18,
              fontWeight: "500",
            },
            textColorAnimation,
          ]}
        >
          Account Number: {user.accountNumber}
        </Animated.Text>
      </View>
      <View style={{ padding: 20 }}>
        <View className="gap-3">
          <Pressable onPress={handleChangePin}>
            <Animated.View
              style={[
                {
                  padding: 20,
                  borderRadius: 10,
                },
                backgroundAnimation,
              ]}
            >
              <Animated.Text
                style={[
                  { textAlign: "center", fontSize: 18 },
                  bTextColorAnimation,
                ]}
              >
                Change PIN
              </Animated.Text>
            </Animated.View>
          </Pressable>
          <Pressable onPress={handleLogout}>
            <Animated.View
              style={[
                {
                  padding: 20,
                  borderRadius: 10,
                },
                backgroundAnimation,
              ]}
            >
              <Animated.Text
                style={[
                  { textAlign: "center", fontSize: 18 },
                  bTextColorAnimation,
                ]}
              >
                Logout
              </Animated.Text>
            </Animated.View>
          </Pressable>
          <Button bottomSheetRef={bottomSheetRef} theme={theme} />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        setTheme={setTheme}
        theme={theme}
        setThemeSwitch={setThemeSwitch}
        themeSwitch={themeSwitch}
      />
    </Animated.View>
  );
};

export default ProfileScreen;
