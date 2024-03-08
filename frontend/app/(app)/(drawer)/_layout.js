import { Drawer } from "expo-router/drawer";
import DrawerContent from "@/components/drawer-content";
export default function DrawerLayout() {
  return (
    <Drawer
      defaultStatus="open"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "75%",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          iconName: "home",

          //   isDivider: true,
        }}
      />

      <Drawer.Screen
        name="deposit"
        options={{
          title: "Deposit Funds",
          iconName: "payments",

          //   isDivider: true,
        }}
      />
      <Drawer.Screen
        name="(stack)"
        options={{
          title: "Cheque Operations",
          iconName: "credit-card-off",
          //   isDivider: true,
        }}
      />
      <Drawer.Screen
        name="financialTips"
        options={{
          title: "Financial Tips",
          iconName: "local-library",
          //   isDivider: true,
        }}
      />
      <Drawer.Screen
        name="changePin"
        options={{
          title: "Change PIN",
          iconName: "lock",
          //   isDivider: true,
        }}
      />
      {/* <Drawer.Screen
        name="changePin"
        options={{
          title: "Change PIN",
          iconName: "lock",
          isDivider: true,
        }}
      /> */}
    </Drawer>
  );
}
