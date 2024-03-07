import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useAuth } from "@/context/authContext";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
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

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 8,
            color: colorScheme === "dark" ? "white" : "black",
          }}
        >
          {user.fullName}
        </Text>
      </View>
      <View style={{ padding: 20 }} className="flex-1 mt-5">
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            Email: {user.email}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: colorScheme === "dark" ? "white" : "black",
            }}
          >
            Account Number: {user.accountNumber}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Pressable
            onPress={handleChangePin}
            style={{
              padding: 10,
              backgroundColor: colors.orange[500],
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Change PIN
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={{
              padding: 10,
              backgroundColor: colors.orange[500],
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
