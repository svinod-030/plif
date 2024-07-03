/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, useWindowDimensions,
    View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {SearchBox} from "./src/components/SearchBox";
import {Section} from "./src/components/Section";
import {GoogleGenerativeAI} from "@google/generative-ai";
import Markdown from 'react-native-markdown-display';

function App(): React.JSX.Element {
  const {height} = useWindowDimensions();
  const [aiResponse, setAiResponse] = useState<string>("**Hello There! Let's talk!**");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const geminiProModel = useRef(new GoogleGenerativeAI("").getGenerativeModel({ model: "gemini-pro"}));

    const onSearch = async (prompt) => {
        if(prompt === undefined || prompt === null) {
            return;
        }
        setSearchInProgress(true)
        try {
            const result = await geminiProModel.current.generateContent(prompt);
            const response = await result.response;
            const responseAsText = response.text();
            if(responseAsText) {
                setAiResponse(responseAsText);
            } else {
                setAiResponse("No Response");
            }
        } catch (e) {
            setAiResponse("Error Response for prompt '" + prompt + "' -: " + e);
        }
        setSearchInProgress(false);
  }
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{...backgroundStyle, minHeight: height}}>
          <View style={{ backgroundColor: Colors.black }}>
            <Section title="Plif">
              <Text style={{ color: Colors.lighter }}>
                  Provided by Google Gemini
              </Text>
            </Section>
          </View>
        <ScrollView style={{...styles.responseContainer, maxHeight: (height-210), overflow: "scroll"}}>
            <Markdown style={markdownStyles}>
                {aiResponse}
            </Markdown>
        </ScrollView>
        <SearchBox onSearch={onSearch} searchInProgress={searchInProgress}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  responseContainer: {
    margin: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.dark,
  },
});

const markdownStyles = StyleSheet.create({
    body: {
        backgroundColor: Colors.dark,
        color: Colors.white,
        paddingVertical: 10,
    },
});

export default App;
