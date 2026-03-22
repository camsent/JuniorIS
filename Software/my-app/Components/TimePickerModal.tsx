import React, {useEffect, useState} from "react";
import {Modal, View, Text, StyleSheet, Button, Alert} from "react-native";
import {Picker} from "@react-native-picker/picker"; //required for scroll wheel in modal

type Props = {
    visible: boolean;
    onClose: () => void;
    onConfirm: (seconds: number, mode: "free" | "strict") => void; //sending time back to screen so the timer can be started
}

type StillnessMode = "free" | "strict"; //moved this type definition here since it is only used in the modal, and it keeps the code more organized

export default function TimePickerModal ({ visible, onClose, onConfirm}: Props){
    const [timeNumber, setTimeNumber] = useState(1) //stores numbers starting at 1 to select 
    const [timeUnit, setTimeUnit] = useState<"seconds" | "minutes" | "hours">("seconds"); //stores units of time to select
    const [mode, setMode] = useState<StillnessMode>("free"); //stores stillness mode selected by user

    useEffect(() => {
        if (visible) {
            setMode("free"); //reset mode to default whenever the modal is opened
        }
    }, [visible])

    return (
        <Modal //creates popup window
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Stillness Duration</Text>

                    {/*Number Picker*/}
                    <Picker
                    selectedValue={timeNumber}
                    onValueChange={(itemValue) => setTimeNumber(itemValue)} //changes state as user is scrolling 
                    style={styles.numberPicker}
                    >
                        {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                            <Picker.Item key={num} label={num.toString()} value={num} color="black" />
                        ))}
                    </Picker>
                    {/* Unit Picker */}
                    <Picker
                        selectedValue={timeUnit}
                        onValueChange={(itemValue) => setTimeUnit(itemValue)}
                        style={styles.unitPicker}
                    >
                        <Picker.Item label="Seconds" value="seconds" color="black"/>
                        <Picker.Item label="Minutes" value="minutes"color="black"/>
                        <Picker.Item label="Hours" value="hours"color="black"/>
                    </Picker>
                    {/* Mode Selection */}
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        <View style={{ marginHorizontal: 10 }}>
                            <Button
                                title="Free"
                                onPress={() => setMode("free")}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <Button
                                title="Strict"
                                onPress={() => setMode("strict")}
                            />
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={{ flexDirection:"row", marginTop: 20, justifyContent: "center" }}>
                        <View style={{ marginHorizontal: 10}}>
                            <Button title="Cancel" onPress={onClose} />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <Button
                                title="Start"
                                onPress={() => {
                                    let totalSeconds = timeNumber;
                                    if (timeUnit === "minutes") totalSeconds *= 60;
                                    if (timeUnit === "hours") totalSeconds *= 3600;

                                    if (mode === "strict") {
                                        Alert.alert(
                                            "Prepare for Stillness",
                                            "Consider enabling Do Not Disturb or a Focus Mode before beginning.",
                                            [
                                                {text: "Cancel" , style: "cancel"},
                                                {
                                                    text: "Begin",
                                                    onPress: () => {
                                                        onConfirm(totalSeconds, mode);
                                                        onClose();
                                                    }
                                                }
                                            ]
                                        )
                                    } else {
                                    onConfirm(totalSeconds, mode);
                                    onClose();
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 12,
        alignItems: "center",
        width: 320,
    },
    pickerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    numberPicker: {
        width: 120,
        height: 200,
        color: "black"
    },
    unitPicker: {
        width: 150,
        height: 200,
        color: "black"
    },
})