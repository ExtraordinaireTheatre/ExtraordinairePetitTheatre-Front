import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
// import VideoPlayer from "expo-video-player";
// import * as ScreenOrientation from "expo-screen-orientation";
// import * as NavigationBar from "expo-navigation-bar";

import { Magnetometer } from "expo-sensors";
import Constants from "expo-constants";

import * as ScreenOrientation from "expo-screen-orientation";

const { width, height } = Dimensions.get("screen");
const TestScreen = () => {
  useEffect(() => {
    const foo = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    };
    foo();
  }, []);
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

      if (data.z > 500) {
        alert("COUCOU");
        setCode(timeCode[i + 1][2] * 1000);
        // console.log("code ::::", code);
        setReset(timeCode[i + 1][1] * 1000);
        // console.log("reset :::: ", reset);

        {
          i + 1 === timeCode.length + 1 ? i : setI(i + 1);
        }
        // setI(i + 1);
        // console.log("i :::: ", i);
        // toogleVideo()
      }
    };
    magnetFunction();
  }, [data]);

  if (stateUser !== "admin") {
    useEffect(() => {
      const fullscreen = () => video.current?.presentFullscreenPlayer();
      {
        Platform.OS === "android" ? fullscreen() : null;
      }
      fullscreen();
    }, []);
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* <View>
        <Text>x : {data.x}</Text>
        <Text>y : {data.y}</Text>
        <Text>z : {data.z}</Text>
        <View style={{ marginTop: 20 }}></View>
      </View> */}
      <View>
        <Button
          title={isPlaying ? "Stop" : "Play"}
          onPress={() => {
            isPlaying
              ? video.current.pauseAsync() && setIsPlaying(!isPlaying)
              : video.current.playAsync() && setIsPlaying(!isPlaying);
          }}
          disabled={stateUser === "admin" ? false : true}
        />
        <Text style={{ textAlign: "center", marginTop: 50 }}>{time}</Text>
      </View>

      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        // shouldPlay={false}
        positionMillis={0}
        useNativeControls
        resizeMode="contain"
        // isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          setTime(status.positionMillis);
          // console.log(status.positionMillis);
          // console.log(timeCode.length);
          // console.log(timeCode[i]);
          // console.log(i);
          // ne pas boucler sur [163, 173, 182] :
          {
            i < timeCode.length - 1 &&
              time >= code &&
              video.current.playFromPositionAsync(reset);
          }
        }}
      />

      <Button
        // ne plus nexter qd [163, 173, 182] :
        title={i === timeCode.length - 1 ? "" : "next"}
        onPress={() => {
          setCode(timeCode[i + 1][2] * 1000);
          // console.log("code ::::", code);
          setReset(timeCode[i + 1][1] * 1000);
          // console.log("reset :::: ", reset);

          {
            i + 1 === timeCode.length + 1 ? i : setI(i + 1);
          }
          // setI(i + 1);
          // console.log("i :::: ", i);
          // toogleVideo()
        }}
        disabled={stateUser === "admin" ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "center",
    // backgroundColor: "black",
    // paddingTop: Constants.statusBarHeight,
    // borderColor: "yellow",
    // borderWidth: 5,
    // flex: 1,
    // justifyContent: "center",
    width: Dimensions.get("screen").width - Dimensions.get("screen").width / 5,
    height: Dimensions.get("screen").height,
    alignItems: "center",
    // justifyContent: "center",
  },
  video: {
    // alignSelf: "center",
    // width: height,
    // height: width,
    // position: "absolute",
    // zIndex: 0,
    // borderColor: "red",
    // borderWidth: 5,
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  // buttons: {
  //   // width: "100%",
  //   // flexDirection: "row",
  //   // // alignItems: "space-between",
  //   // alignItems: "center",
  //   // justifyContent: "center",
  //   // // left: 30,
  //   // position: "absolute",
  //   // top: 50,
  //   // backgroundColor: "red",
  //   // zIndex: 2,
  //   position: "absolute",
  //   bottom: 10,
  // },
});

export default TestScreen;
