import { Stack } from "expo-router";
export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="cheques/my-cheques" />
      <Stack.Screen name="cheques/issue-cheque" />
    </Stack>
  );
}
