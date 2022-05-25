import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
// import VideoPlayer from "expo-video-player";
// import * as ScreenOrientation from "expo-screen-orientation";
// import * as NavigationBar from "expo-navigation-bar";

import { Magnetometer } from "expo-sensors";
import Constants from "expo-constants";

import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const DisplayScreen = ({ navigation, route }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const timeCode = [
    [0, 10, 15],
    [20, 30, 33],
    [36, 48, 51],
    [52, 64, 66], // 1m06
    [68, 79, 83], // 1m23
    [88, 96.1, 102.1], //1m43
    [103, 113, 118], // 1m59
    [123, 133, 138], // 2m18
    [143, 153, 158], //2m38
    [163, 173, 182], //2m58
  ];
  const [i, setI] = useState(0);
  const [code, setCode] = useState(timeCode[i][2] * 1000);
  const [reset, setReset] = useState(timeCode[i][1] * 1000);

  const [stateUser, setUser] = useState("admin");

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const magnetFunction = async () => {
      Magnetometer.setUpdateInterval(1000);
      Magnetometer.addListener((result) => {
        setData(result);
      });

      if (data.z > 700) {
        alert("COUCOU");
        setCode(timeCode[i + 1][2] * 1000);
        setReset(timeCode[i + 1][1] * 1000);

        {
          i + 1 === timeCode.length + 1 ? i : setI(i + 1);
        }
      }
    };
    magnetFunction();
    return () => {
      Magnetometer.removeAllListeners();
    };
  }, [data]);

  useEffect(() => {
    const foo = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      await NavigationBar.setVisibilityAsync("hidden");
    };
    if (stateUser !== "admin") {
      const fullscreen = async () => {
        video.current?.presentFullscreenPlayer();
      };

      {
        Platform.OS === "android" ? fullscreen() : null;
      }
      fullscreen();
    }
    foo();
  }, []);

  const portrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {stateUser === "admin" && (
        <View style={styles.ViewButtons}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => {
              navigation.navigate("Story", { bookData: route.params.bookData });
              portrait();
            }}>
            <Ionicons
              name="arrow-back-outline"
              size={16}
              color={"rgb(165, 81, 69)"}
            />
          </TouchableOpacity>
          <Button
            style={styles.button}
            title={isPlaying ? "Stop" : "Play"}
            onPress={() => {
              isPlaying
                ? video.current.pauseAsync() && setIsPlaying(!isPlaying)
                : video.current.playAsync() && setIsPlaying(!isPlaying);
            }}
            disabled={stateUser === "admin" ? false : true}
          />
        </View>
      )}

      <Video
        onFullscreenUpdate={() => {
          if (i === timeCode.length - 1) {
            navigation.navigate("Story", { bookData: route.params.bookData });
            portrait();
          }
        }}
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        // shouldPlay={false}
        positionMillis={0}
        useNativeControls
        // resizeMode="cover"
        // isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          setTime(status.positionMillis);

          {
            i < timeCode.length - 1 &&
              time >= code &&
              video.current.playFromPositionAsync(reset);
          }
        }}
      />

      {stateUser === "admin" && (
        <View style={styles.ViewButtons}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: "rgb(226, 218, 210)",
            }}>
            {time}
          </Text>
          <Button
            style={styles.button}
            // ne plus nexter qd [163, 173, 182] :
            title={i === timeCode.length - 1 ? "" : "next"}
            onPress={() => {
              setCode(timeCode[i + 1][2] * 1000);
              setReset(timeCode[i + 1][1] * 1000);

              {
                i + 1 === timeCode.length + 1 ? i : setI(i + 1);
              }
            }}
            disabled={stateUser === "admin" ? false : true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "flex-start",
  },
  video: {
    alignSelf: "center",
    width: "85%",
    height: Dimensions.get("screen").height,
  },
  ViewButtons: {
    height: "50%",
    paddingTop: 40,
    // borderColor: "yellow",
    // borderWidth: 4,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    marginTop: 150,
  },
  goBack: {
    backgroundColor: "rgb(226, 218, 210)",
    borderWidth: 1,
    borderRadius: 50,
    padding: 15,
    color: "rgb(165, 81, 69)",
    borderWidth: 0,
  },
});

export default DisplayScreen;
