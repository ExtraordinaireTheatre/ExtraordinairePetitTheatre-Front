import { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
// import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
// import VideoPlayer from "expo-video-player";
// import * as ScreenOrientation from "expo-screen-orientation";
// import * as NavigationBar from "expo-navigation-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const TestScreen = () => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(166000);
  const timeCode = [
    [0, 10, 15],
    [20, 30, 33],
    [36, 48, 51],
    [52, 64, 66],
    [68, 79, 83],
    [88, 96.1, 102.1],
    [103, 113, 118],
    [123, 133, 138],
    [143, 153, 158],
    [163, 173, 178],
  ];
  const [i, setI] = useState(0);
  const [code, setCode] = useState(timeCode[i][2] * 1000);
  const [reset, setReset] = useState(timeCode[i][1] * 1000);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        shouldPlay={false}
        positionMillis={166000}
        useNativeControls={false}
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          setTime(status.positionMillis), console.log(status.positionMillis);
          time >= code && video.current.playFromPositionAsync(reset);
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
          title={"next"}
          onPress={() => {
            setCode(timeCode[i + 1][2] * 1000);
            console.log("code ::::", code);
            setReset(timeCode[i + 1][1] * 1000);
            console.log("reset :::: ", reset);
            {
              i + 1 === timeCode.length + 1 ? i : setI(i + 1);
            }
            // setI(i + 1);
            console.log("i :::: ", i);
            // toogleVideo()
          }}
        />
      </View>
      {/* {time >= 15000 && playFromPositionAsync(10000)}
    {time >= 15000 && <Text>ZIZI</Text>} */}
      {/* {time >= 15000 && setIsPlaying(false)} */}
      <Text style={{ textAlign: "center", marginTop: 50 }}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestScreen;
