import { Text, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView} from "react-native"
import { useState} from "react"
import { useFocusEffect } from "expo-router"; 
import React from "react";
import Button from "@/Components/Button";


type ReflectionEntry = {
    text: string;
    timestamp: number;
}

export default function Reflection() {
    const [text, setText] = useState("");
    const [prompt, setPrompt] = useState("");
    const [entries, setEntries] = useState<ReflectionEntry[]>([]);

    const prompts = [
        "What stood out to you during this time?",
        "Did you feel distracted at any point? If so, what caused the distraction?",
        "What do you think God is trying to teach you through this experience?",
        "What thoughts or feelings came up for you during this time? How did you respond?",
        "How do you feel after this time?"
    ]
    useFocusEffect( //hook that runs when the screen comes into focus, ensures a new prompt is generated each time the user navigates to the reflection screen
        React.useCallback(() => { //useCallback is used to memoize the function, preventing unnecessary re-renders and ensuring the prompt only changes when the screen is focused
            const randomPrompt = 
            prompts[Math.floor(Math.random() * prompts.length)]; //randomly selects a prompt from the array to display on the reflection screen
            setPrompt(randomPrompt);
        }, []) //empty dependency array means the function will only be created once, and won't change on re-renders, which is important for useFocusEffect to work correctly
    )
    
    const formatDateTime = (timestamp: number) => {
        const date = new Date(timestamp);

        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const ampm = hours >= 12? "PM" : "AM";
        hours = hours % 12 || 12; // converts 24-hour format to 12-hour format, if hours is 0 (midnight) it will be set to 12

        return `[${month}/${day}/${year}] [${hours}:${minutes} ${ampm}]`; //returns formatted date and time string for each reflection entry, making it easier for users to see when each reflection was made
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>            
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Reflection</Text>

                <Text style={styles.prompt}>{prompt}</Text>

                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Write your thoughts..."
                    value={text}
                    onChangeText={setText}
                />
                <Button
                    label="Save Reflection"
                    onPress={() => {
                        if (!text.trim()) return; //prevents saving empty reflections, trim removes whitespace from both ends of the string, so it checks if there's any actual content before allowing the save

                        const newEntry = {
                            text,
                            timestamp: Date.now(),
                        };
                        setEntries((prev) => [newEntry, ...prev]); //adds the newest entry to the top of the list
                        setText(""); //clears the text input after saving
                    }}
                />
                <View style={{ marginTop: 20 }}>
                    {entries.map((entry, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom: 15,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "gray", marginBottom: 5 }}>
                                {formatDateTime(entry.timestamp)}    
                            </Text>
                            <Text>{entry.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    ) 
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
    prompt: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
    }
})