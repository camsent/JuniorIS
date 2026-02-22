import { Text, View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../Components/Button"


export default function Index() {

  const [timeLeft, setTimeLeft] = useState<number | null>(null); //timeLeft is the value, setTimeLeft is updating the value, value can either
//be a number or null
  const startStillness = () => {
    Alert.alert( //popup
      "Stillness Mode",
      "Activate for 30 seconds?",
      [
        { text: "Cancel", style: "cancel"},
        {
          text: "OK",
          onPress: () => setTimeLeft(5) //starts timer
        }
      ]
    )
  }

  useEffect (() => {
    if (timeLeft === null || timeLeft === 0) return; //stops timer from running inf

    const interval = setInterval(() => {
      setTimeLeft(prev => (prev ? prev - 1 : 0));
    }, 1000); //every second (1000 milliseconds) it decreases value by 1

    return () => clearInterval(interval); //prevents multiple intervals running at once
  }, [timeLeft]) //run this effect whenever timeLeft changes
  return (
    <LinearGradient colors={["white", "grey"]} style={styles.container}>
      <Text style={styles.header}>GOD TIME</Text>
      
      <View style={styles.contentContainer}>
        <Button label="Stillness Mode" onPress={startStillness}/>
        {timeLeft !== null && timeLeft > 0 && ( //if timeLeft is not null and its greater than 0 show the timer
          <Text style={styles.timerText}>
            {timeLeft}
          </Text>
        )}
      

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

