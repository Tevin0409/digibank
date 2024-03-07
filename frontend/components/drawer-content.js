import { View, Image, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DrawerButton from "@/components/drawer-button";
const DrawerContent = (drawerProps) => {
  return (
    <View className="flex-1 bg-gray-600 overflow-hidden">
      <View className=" mt-16 pb-2 border-b border-gray-500">
        <Image
          style={{ width: hp(18) }}
          className="ml-5"
          resizeMode="contain"
          source={require("@/assets/images/digi-logo.png")}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <View className="mt-2">
          {drawerProps.state.routes.map((route, index) => {
            const isFocused = drawerProps.state.index === index;
            const options = drawerProps.descriptors[route.key].options;

            if (options.title === undefined) {
              return;
            }
            const onPress = () => {
              const event = drawerProps.navigation.emit({
                type: "drawerItemPress",
                canPreventDefault: true,
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                drawerProps.navigation.navigate(route.name, route.params);
              }
            };
            return (
              <View key={route.key} className="w-full">
                {options.sectionTitle && (
                  <Text className="text-gray-400 text-sm font-heading uppercase ml-4 mt-6">
                    {options.sectionTitle}
                  </Text>
                )}

                <DrawerButton
                  title={options.title}
                  isFocused={isFocused}
                  iconName={options.iconName}
                  isDivider={options.isDivider}
                  notifications={options.notifications}
                  onPress={onPress}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;
