import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function CardItem({
  imgUrl,
  price,
  cardType,
  cardNumber,
  backgroundColor,
}) {
  return (
    <TouchableOpacity className="mr-4">
      <View
        className="flex flex-row rounded-3xl py-8 px-4 justify-between"
        style={{
          width: width * 0.45,
          height: height * 0.3,
          backgroundColor: backgroundColor,
        }}
      >
        <View>
          <Image
            source={imgUrl}
            style={{
              width: 65,
              height: 65,
            }}
            className="rounded-full"
            resizeMode="contain"
          />
        </View>

        <View className="flex flex-col justify-start p-6">
          <View className="space-y-2">
            <Text className="font-heading text-lg text-white">
              {cardNumber}
            </Text>
          </View>

          <View className="space-y-2">
            <Text className=" font-subtitle text-2xl text-white">{price}</Text>

            <Text className=" font-body text-lg text-white">{cardType}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
