import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("@/assets/anim/anim-loading.json")}
      />
    </View>
  );
};

export default Loading;
