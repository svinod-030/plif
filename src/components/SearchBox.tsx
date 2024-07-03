import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import { ArrowRight } from "../assets/ArrowRight";
import {Colors} from "react-native/Libraries/NewAppScreen";
import LoadingCircles from "../assets/LoadingCircles";

export const SearchBox = ({onSearch, searchInProgress}): React.JSX.Element => {
    const [text, onChangeText] = React.useState();

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={"Start typing...!"}
        />
        {searchInProgress ? <LoadingCircles /> : null}
        <TouchableOpacity
            disabled={searchInProgress}
            style={styles.submit}
            onPress={() => onSearch(text)}>
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
        alignItems: "center",
        backgroundColor: Colors.black,
        color: Colors.white,
        margin: 10,
    },
    input: {
        flex: 2,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: Colors.white,
        color: Colors.black,
    },
    submit: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        padding: 14,
        backgroundColor: Colors.white,
        color: Colors.black,
    }
});
