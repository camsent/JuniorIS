import { Text, View, StyleSheet, TextInput } from "react-native"
import { useState} from "react"

export default function Reflection() {
    const [text, setText] = useState("");
    const prompts = [
        "What stood out to you during this time?",
        "Did you feel distracted at any point? If so, what caused the distraction?",
        "What do you think God is trying to teach you through this experience?",
        "What thoughts or feelings came up for you during this time? How did you respond?",
        "How do you feel after this time?"
    ]
    const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]); //randomly selects a prompt from the array to display on the reflection screen

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Reflection</Text>

            <Text style={styles.prompt}>{prompt}</Text>

            <TextInput
                style={styles.input}
                multiline
                placeholder="Write your thoughts..."
                value={text}
                onChangeText={setText}
            />
        </View>
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