import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";

export default function Stats() {
    return (
        <LinearGradient colors={["white", "grey"]} style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}>Your Practice</Text>

                <Text style={styles.stat}>Days Practiced: 0</Text>
                <Text style={styles.stat}>Total Time: 0 minutes</Text>
                <Text style={styles.stat}>Reflections: 0</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
    },
    stat: {
        fontSize: 18,
        marginBottom: 15,
    },
});