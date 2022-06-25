import React, { useState, useEffect } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//AsyncStorage is not suitable for storing sensitive information.
export default function AsyncSt() {
    const [nickname, setNickname] = useState();
    useEffect(() => {
        const firstLoad = async () => {
            try {
                const savedNickname = await AsyncStorage.getItem("@nickname");
                setNickname(savedNickname);
            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);

    const saveNickname = async () => {
        try {
            await AsyncStorage.setItem("@nickname", nickname);
        } catch (err) {
            console.log(err);
        }
        Keyboard.dismiss();
    };

    const removeNickname = async () => {
        try {
            await AsyncStorage.removeItem("@nickname");
            setNickname();
        } catch (err) {
            console.log(err);
        }
        Keyboard.dismiss();
    };
    return (
        <View style={styles.container}>
            {nickname ? (
                <Text style={styles.heading}>Hello {nickname}</Text>
            ) : (
                <Text style={styles.heading}>Create your nickname</Text>
            )}
            <TextInput
                placeholder="Enter Your Nickname"
                style={styles.textInput}
                value={nickname}
                onChangeText={(value) => {
                    setNickname(value);
                }}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={saveNickname} />
                <Button title="Delete" onPress={removeNickname} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff9df",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 24,
    },
    textInput: {
        width: 300,
        marginVertical: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#73b786",
        borderRadius: 50,
    },
    buttonContainer: {
        width: 240,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});