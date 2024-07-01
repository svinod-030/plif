import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import { ArrowRight } from "../assets/ArrowRight";

export const SearchBox = ({onSearch}): React.JSX.Element => {
    const [text, onChangeText] = React.useState();

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={"Ask me something!"}
        />
        <TouchableOpacity style={styles.submit} onPress={() => onSearch(text)}>
            <ArrowRight
                height={"20px"}
                width={"20px"}
            />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 2,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        padding: 10
    },
    submit: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        padding: 14
    }
});
