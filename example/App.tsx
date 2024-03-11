import * as ExpoInstallApk from "expo-install-apk";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => ExpoInstallApk.install("", "")}>
        <Text>Install</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
