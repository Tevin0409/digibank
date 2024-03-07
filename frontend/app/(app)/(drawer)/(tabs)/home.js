import { Pressable, View, Switch } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { SearchMenuBar } from "@/components/SearchMenuBar";
import MenuButton from "@/components/menu-button";
import Avatar from "@/components/avatar";
import FloatButton from "@/components/float-button";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { useColorScheme } from "nativewind";
import Transactions from "@/components/Transactions";

const Home = () => {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { balance, user } = useAuth();
  useEffect(() => {
    const fetchBalance = async () => {
      await balance(); // Call the balance function
    };
    fetchBalance();
  }, []);

  return (
    <View className="dark:bg-gray-900 bg-slate-50 flex-1 pt-14 p-4 gap-4 ">
      <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
      <SearchMenuBar colorScheme={colorScheme}>
        <MenuButton colorScheme={colorScheme} />
        <SearchMenuBar.Field
          colorScheme={colorScheme}
          placeholder="Search ..."
        />
        <Pressable onPress={() => router.push("profile")}>
          <Avatar source={{ uri: "https://github.com/tevin0409.png" }} />
        </Pressable>
      </SearchMenuBar>

      <Header />
      <Transactions />

      <FloatButton
        colorScheme={colorScheme}
        onPress={() => router.push("deposit")}
        icon={"add"}
      />
    </View>
  );
};

export default Home;
