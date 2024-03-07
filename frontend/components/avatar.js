import { Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Avatar = ({ size = "medium", ...rest }) => {
  return (
    <Image
      style={{ height: hp(4), width: wp(8) }}
      className="rounded-full"
      {...rest}
    />
  );
};

export default Avatar;
