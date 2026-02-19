import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function Index() {
  return (
    <LinearGradient colors={["white", "grey"]} style={styles.container}>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Come to Me, all you who labor and are heavy laden</Text>
        <Text style={styles.bottomText}>and I will give you rest</Text>
        <Text style={styles.bottomText}>Matthew 11:28</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40, 
  },
  bottomText: {
    color: "#FFFFFF",
    fontFamily: "Arial Narrow, sans-serif",
  }
})

