import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen(navigation) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is Home Screen")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Home Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signup: {
    backgroundColor: "green",
    textAlign: "center",
    fontWeight: "bold",
    color: "crimson",
  },
});
