import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { useSessions } from "@/context/SessionContext"

type Session = { //defining the structure of a session object, which will be used to store data about each stillness session for the stats screen
    duration: number;
    completed: boolean;
    mode: "free" | "strict";
    timestamp: number;
}

export default function Stats() {

    const { sessions } = useSessions(); //gives access to everything that happened in the session to record stats

    const getDaysPracticed = (sessions: Session[]) => { //we're taking all sessions and calculating how many unique days the user has practiced, we create a set to store unique day identifiers based on the session timestamps, then return the size of the set as the total number of days practiced
        const days = new Set(
            sessions
            .filter((s) => s.completed) //only counting completed sessions towards stats, so we filter out any sessions that were started but not completed
            .map((s) => {
                const d = new Date(s.timestamp);
                return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            })
        );
        return days.size;
    }
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