import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import ChequeCard from "@/components/ChequeCard";
const MyChequesScreen = () => {
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { myCheques, user } = useAuth();
  const router = useRouter();

  const fetchCheques = useCallback(async () => {
    try {
      setLoading(true);
      const result = await myCheques();
      console.log(result.data);
      setCheques(result.data); // Assuming the response data is an array of cheques
    } catch (error) {
      console.error("Error fetching cheques:", error);
    } finally {
      setLoading(false);
    }
  }, [myCheques]);

  useEffect(() => {
    fetchCheques();
  }, [fetchCheques, user.accountBalance]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCheques();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchCheques]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orange[500]} />
      </View>
    );
  }
  if (!cheques.length) {
    return (
      <View style={{ flex: 1 }}>
        <View className="flex-row justify-start mt-10 ml-5">
          <Pressable
            onPress={() => router.back()}
            className="bg-red-600 p-2 rounded-tr-2xl mt-4 rounded-bl-2xl py-2"
          >
            <MaterialIcons name={"menu"} size={25} color={colors.white} />
          </Pressable>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text className="font-semibold text-lg font-heading">
            You have not issued any cheques
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("cheques/issue-cheque")}
          >
            <Text
              className="font-semibold font-subtitle text-xl underline"
              style={{ color: colors.orange[500] }}
            >
              Issue a cheque
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Pressable onPress={() => router.push("cheques")}>
            <Text className="font-semibold text-[#ea3d3d]">
              {" "}
              Back to Cheque Menu
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        paddingBottom: hp(15),
        paddingHorizontal: wp(5),
      }}
      className="flex-1 dark:bg-gray-700 bg-white "
    >
      <View className="flex-row justify-start mt-10 ml-5">
        <Pressable
          onPress={() => router.back()}
          className="bg-red-600 p-2 rounded-tr-2xl mt-4 rounded-bl-2xl py-2"
        >
          <MaterialIcons name={"arrow-back"} size={25} color={colors.white} />
        </Pressable>
      </View>
      <FlatList
        data={cheques}
        keyExtractor={(item) => item.id.toString()} // Adjust the key extractor based on your cheque data structure
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ChequeCard
            payee={item.payeeName}
            amount={item.amount}
            chequeNumber={item.chequeNumber}
            date={item.clearanceDate}
            status={item.status}
          />
        )} // Render your cheque item component here
        ItemSeparatorComponent={() => (
          <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }} />
        )} // Adjust the style of item separator
      />
      <View style={{ flex: 1 }}>
        <Pressable onPress={() => router.push("cheques")}>
          <Text className="font-semibold text-[#ea3d3d]">
            {" "}
            Back to Cheque Menu
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyChequesScreen;
