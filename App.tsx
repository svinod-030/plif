/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
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
import LottieView from "lottie-react-native";

function App(): React.JSX.Element {
  const {height} = useWindowDimensions();
  const [aiResponse, setAiResponse] = useState<string>("I am Gemini, a multimodal AI model, developed by Google. I am designed to provide information and assist users with a wide range of topics and tasks.");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const geminiProModel = useRef(new GoogleGenerativeAI("")
      .getGenerativeModel({ model: "gemini-pro"}));

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
        style={{...backgroundStyle}}>
          <View style={{ backgroundColor: Colors.black }}>
            <Section title="Plif">
              <Text style={{ color: Colors.lighter }}>
                  Provided by Google Gemini
              </Text>
            </Section>
          </View>
        <View style={{...styles.responseContainer}}>
            {searchInProgress
                ? <LottieView autoPlay loop style={styles.loading}
                      source={require('./src/assets/Lottie/Loading.json')}/>
                : (<Markdown style={markdownStyles}>
                    {aiResponse}
                    </Markdown>)
            }
        </View>
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
    loading: {
      height: 100,
      width: 100,
      alignSelf: "center"
    }
});

const markdownStyles = StyleSheet.create({
    body: {
        backgroundColor: Colors.dark,
        color: Colors.white,
        paddingVertical: 10,
    },
});

export default App;
