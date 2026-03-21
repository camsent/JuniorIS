import { Text, View, StyleSheet, Alert, AppState} from "react-native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router"
import Button from "../Components/Button"
import TimePickerModal from "@/Components/TimePickerModal";



export default function Index() {

  type StillnessMode = "free" | "strict";

  const [timeLeft, setTimeLeft] = useState(0); //timeLeft is the value, setTimeLeft is updating the value, value can either be a number or null
  const [endTime, setEndTime] = useState<number | null>(null); //stores timestamp when timer should end
  const [initialTime, setInitialTime] = useState(0); //stores original timer duration chosen by user
  const [isRunning, setIsRunning] = useState(false); //controls whether timer is currently active
  const [modalVisible, setModalVisible] = useState(false); //controls whether modal is currently visible
  const appState = useRef(AppState.currentState); //stores previous state of app, useRef stores a value without triggering a re-render
  const [interrupted, setInterrupted] = useState(false); //tracks whether the user left the app during stillness mode, 
  const [mode, setMode] = useState<StillnessMode>("free"); //stores the current stillness mode, default is "free"
  
  const showStillnessModal = () => setModalVisible(true);
  const startStillnessTimer = (seconds: number) => {
    const now = Date.now();
    setEndTime(now + seconds * 1000); //logic allows the timer to stay accurate even if the app isn't in an active state
    setIsRunning(true);
  }
  //modal time formatting function
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60;

    const h = hours.toString().padStart(2, "0")
    const m = minutes.toString().padStart(2, "0")
    const s = seconds.toString().padStart(2, "0")

    return `${h}:${m}:${s}`;
  }

  useEffect(() => {
    if (!isRunning || !endTime) return; //prevents timer from starting unless the timer is running, or a valid end time exists

    const interval = setInterval(() => {
      if (!endTime) return; //safety check to ensure endTime is valid before calculating remaining time
      const remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000)); //stores remaining time in seconds
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsRunning(false)
        clearInterval(interval) // so it stops executing
      }
    }, 1000)
    return () => clearInterval(interval); //prevents multiple intervals running at once
  }, [isRunning, endTime]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => { //runs whenever app state changes
      //Only mark interrupted if stillness is running and user left the app (not just locked their phone)
      if (mode === "strict" && isRunning && appState.current === "active" && nextState !== "active") {
        setInterrupted(true);
      }

      if (mode === "strict" && interrupted && nextState === "active")  {
        if (interrupted) {
          Alert.alert(
            "Stillness Interrupted",
            "You left the app during stillness mode. The session has ended"
          );
          setIsRunning(false);
          setTimeLeft(0); //stop timer and reset display when user returns to the app
          setEndTime(null);
          setInterrupted(false);
        }
      }
      appState.current = nextState;
    });

    return () => subscription.remove(); //cleanup function
  }, [mode, isRunning, interrupted]); //tells React to recreate event listener whenever these values change

  return (
  <LinearGradient colors={["white", "grey"]} style={styles.container}>
    <TimePickerModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onConfirm={(seconds, selectedMode) => {
        setInitialTime(seconds);
        startStillnessTimer(seconds);
        setMode(selectedMode);
        setModalVisible(false);
      }}
    />

    <Text style={styles.header}>GOD TIME</Text>

    <View style={styles.contentContainer}>
      {/* Stillness Mode Button */}
      {!isRunning && (
        <Button label="Stillness Mode" onPress={showStillnessModal} />
      )}

      {/* Timer Display */}
      {timeLeft > 0 && (
        <Text style={styles.timerText}>
          {formatTime(timeLeft)}
        </Text>
      )}

      {/* Mode Indicator */}
      {isRunning && (
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            color: mode === "strict" ? "red" : "black",
          }}
        >
          {mode === "strict" ? "Strict Mode" : "Free Mode"}
        </Text>
      )}

      {/* Free Mode Controls */}
      {mode === "free" && (
        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              label={isRunning ? "Pause" : "Start"}
              onPress={() => {
                if (isRunning) {
                  // Pause
                  setIsRunning(false);
                  setInitialTime(timeLeft); // store remaining time
                } else {
                  // Resume
                  const now = Date.now();
                  setEndTime(now + timeLeft * 1000);
                  setIsRunning(true);
                }
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              label="Quit"
              onPress={() => {
                setIsRunning(false);
                setTimeLeft(0);
                setEndTime(null);
                setInterrupted(false);
              }}
            />
          </View>
        </View>
      )}

      {/* Strict Mode Indicator */}
      {mode === "strict" && isRunning && (
        <Text
          style={{
            marginTop: 20,
            fontWeight: "600",
            color: "red",
            textAlign: "center",
          }}
        >
          Strict Mode Active — Do Not Leave The App
        </Text>
      )}

      {/* Bottom Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Come to Me, all you who labor and are heavy laden
        </Text>
        <Text style={styles.bottomText}>
          and I will give you rest
        </Text>
        <Text style={styles.bottomText}>
          Matthew 11:28
        </Text>
      </View>
    </View>
  </LinearGradient>
);
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 100,
    fontSize: 40,
    fontFamily: "Copperplate, fantasy",
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },

  contentContainer: {
    alignItems: "center",
  },

  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  bottomText: {
    textAlign: "center",
  },
  timerText: {
    fontSize: 28,
    marginTop: 15,
    fontWeight: "600",
  },
});

