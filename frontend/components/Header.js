import React from "react";
import { View, Text, Image } from "react-native";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 6, fontWeight: "bold" }}>
        {user ? `Welcome back ${user.fullName}` : "Welcome"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1E2126",
          borderRadius: 20,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: "https://github.com/tevin0409.png" }}
          style={{
            width: 80,
            height: 85,
          }}
          resizeMode="contain"
          className="rounded-xl"
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text className="font-heading text-xl text-white">
            A/C No: {user ? user.accountNumber : "N/A"}
          </Text>
          <Text className=" font-subtitle text-lg text-white">
            Account Holder: {user ? user.fullName : "N/A"}
          </Text>
          <Text className=" font-body text-lg text-white">
            Balance: {user ? `KES ${user.accountBalance}` : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
