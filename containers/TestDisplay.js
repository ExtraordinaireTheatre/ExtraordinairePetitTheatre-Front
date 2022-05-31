import { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";

import { Magnetometer } from "expo-sensors";

import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import StoryScreen from "./StoryScreen";

import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

export default function TestDisplay({ navigation, route }) {
    const video = useRef(null);
    // const animation = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const { bookData } = route.params;
  
    const timeCode = [...bookData.timeCode];
    console.log(timeCode);
    const [i, setI] = useState(0);
    const [code, setCode] = useState(timeCode[i][2] * 1000);
    const [reset, setReset] = useState(timeCode[i][1] * 1000);
  
    const [stateUser, setUser] = useState("user");
    const [stepForward, setStepForward] = useState(false);
    const [finish, setFinish] = useState(false);
    const animation = useRef(null);
  
    const [data, setData] = useState({
      x: 0,
      y: 0,
      z: 0,
    });
  
    // USE MAGNET TO GO TO NEXT SCENE
    useEffect(() => {
      const magnetFunction = async () => {
        Magnetometer.setUpdateInterval(1000);
        Magnetometer.addListener((result) => {
          setData(result);
        });
  
        if (data.z > 700) {
          // alert("COUCOU");
          setStepForward(true);
          setCode(timeCode[i + 1][2] * 1000);
          setReset(timeCode[i + 1][1] * 1000);
  
          {
            i + 1 === timeCode.length ? setI(timeCode.length) : setI(i + 1);
          }
        }
      };
      magnetFunction();
      return () => {
        Magnetometer.removeAllListeners();
        setStepForward(false);
      };
    }, [data]);
    useEffect(() => {
        const navigationBar = async () => {
          await NavigationBar.setVisibilityAsync("hidden");
        };
        {
          Platform.OS === "android" && navigationBar();
        }
      }, []);
      // QUIT VIDEO AND MAKE PORTRAIT_UP
      const back = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      };
      const handleFinish = () => {
        setFinish(true);
      };
      const backAction = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
        navigation.navigate("Story", {
          bookData: route.params.bookData,
          tome: route.params.tome,
        });
      };
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />


            
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: bookData.video }}
                // {{ uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",}}
                shouldPlay={true}
                positionMillis={0}
                useNativeControls={false}
                resizeMode="cover"
                onPlaybackStatusUpdate={(status) => {
                  setTime(status.positionMillis);
                  {
                    i < timeCode.length - 1 &&
                      time >= code &&
                      video.current.playFromPositionAsync(reset);
                  }
                }}
            />
            </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: "center",
   justifyContent: "center"
 }
});