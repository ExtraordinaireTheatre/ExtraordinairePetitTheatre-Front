import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button , Platform} from "react-native";
// import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
// import VideoPlayer from "expo-video-player";
// import * as ScreenOrientation from "expo-screen-orientation";
// import * as NavigationBar from "expo-navigation-bar";

const { width, height } = Dimensions.get("screen");
const TestScreen = () => {
  // useEffect(() => {
  //   const foo = async () => {
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
  //     );
  //   };
  //   foo();
  // }, []);
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
  const fullscreen = () => video.current?.presentFullscreenPlayer();
  {Platform.OS === 'android'? fullscreen(): null}
  // fullscreen();
  return (
    <View style={styles.container}>
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

      <View style={styles.buttons}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            isPlaying
              ? video.current.pauseAsync() && setIsPlaying(!isPlaying)
              : video.current.playAsync() && setIsPlaying(!isPlaying);
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
        />
      </View>

      <Text style={{ textAlign: "center", marginTop: 50 }}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:'column',
    // justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  video: {
    alignSelf: "center",
    width: height,
    height: width,
    position: "relative",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "space-between",
    // alignItems: "center",
    // left: 30,
    position: "absolute",
  },
});

export default TestScreen;
