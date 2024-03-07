import { View, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <ActivityIndicator className="flex-1 bg-red-900 justify-center items-center" />
  );
};

export default Loader;
