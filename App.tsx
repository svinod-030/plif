/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
    Image,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight, useWindowDimensions,
    View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {SearchBox} from "./src/components/SearchBox";
import {Section} from "./src/components/Section";
import {GoogleGenerativeAI} from "@google/generative-ai";
import Markdown from 'react-native-markdown-display';
import LottieView from "lottie-react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CAMERA_SOURCE} from "./src/constants/index";

function App(): React.JSX.Element {
  const {height} = useWindowDimensions();
  const [aiResponse, setAiResponse] = useState<string>("Hello, I am Plif, AI model, Integrated with gemini (developed by google). I am designed to provide information and assist users with a wide range of topics and tasks.");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string>();
  const geminiProModel = useRef(new GoogleGenerativeAI("")
      .getGenerativeModel({ model: "gemini-1.5-flash"}));

    const onSearch = async (prompt) => {
        setSearchInProgress(true)
        try {
            let request = prompt;
            if(image != null && prompt != null) {
             request = [prompt, image];
            } else if((prompt == undefined || prompt == null) && image != null) {
                request = [image];
            }
            const result = await geminiProModel.current.generateContent(request);
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

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            }
            // } else {
            //     console.log('Camera permission denied');
            // }
        } catch (err) {
            console.warn(err);
        }
    };

    const onSearchWithImage = async (source) => {
        await requestCameraPermission();
        let response
        if(source === CAMERA_SOURCE) {
            response = await launchCamera({
                mediaType: 'mixed',
                includeBase64: true,
            });
        } else {
            response = await launchImageLibrary({
                mediaType: 'mixed',
                includeBase64: true,
            });
        }
        setSearchInProgress(true);
        try {
            if(response.assets && response.assets[0]) {
                const imageData = {
                    inlineData: {
                        data: response.assets[0].base64,
                        mimeType: response.assets[0].type,
                    },
                };
                setImage(imageData);
                console.warn("image uri: " + response.assets[0].uri);
                setImageUri(response.assets[0].uri);
            }
        } catch (e) {
            // console.warn("Error occurred: " + e);
            setAiResponse("Error occurred: " + e);
        }
        setSearchInProgress(false);
    }

    const clearImageSelection = async () => {
        setImage(null);
        setImageUri(undefined);
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
          { (imageUri != null) &&
          <View style={styles.thumbnail}>
            <Image
              height={50}
              width={50}
              source={{uri: imageUri}}
              alt={imageUri}/>
            <TouchableHighlight onPress={clearImageSelection}>
              <Text style={styles.clear}>
                X
              </Text>
            </TouchableHighlight>
          </View>
          }
        <SearchBox
            onSearch={onSearch}
            onSearchWithImage={onSearchWithImage}
            searchInProgress={searchInProgress}
        />
      </ScrollView>
      <Text style={styles.clear}>
          Copyright © Vinod Sigadana (vinodsigadana030@gmail.com)
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  responseContainer: {
    margin: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.dark,
  },
    thumbnail: {
        margin: 12,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    clear: {
        color: Colors.white,
        padding: 20
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
