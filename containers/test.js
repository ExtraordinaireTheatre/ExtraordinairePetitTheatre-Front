import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { useState, useRef } from "react";

const { width, height } = Dimensions.get("window");
const TestScreen = () => {
  const video = useRef(null);
  const [status, setStatus] = useState(0);
  const [paused, setPaused] = useState(false);

  const onPlay = () => video.current.playAsync();
  const onPause = () => video.current.pauseAsync();
  const rePlay = () => video.current.replayAsync();
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        // paused={paused}
        // progressUpdateIntervalMillis={3000}
        // onPlay={onPlay}
        // onProgress={onProgress}
        // onEnd={onFinish}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        useNativeControls
        // positionMillis={5000}
        // progressUpdateIntervalMillis={1000}
        playableDurationMillis={3000}
        resizeMode="contain"
        isLooping={false}
        // durationMillis={5000}
        // ne le fait que 4 fois
        onPlaybackStatusUpdate={(status) => {
          if (status.positionMillis === 3000) {
            video.current.replayAsync();
          }

          // setStatus(status)
          console.log(status);
        }}
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}

        // onPlaybackStatusToSet={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        {/* <Button
            title="btn"
            onPress={() => {
              // video.current.playFromPositionAsync(5000);
              // video.current.setPositionAsync(5000);
              // video.replayAsync(1000);
              // video.current.durationMillis();
            }}
          ></Button> */}
        <Button title="Play" onPress={onPlay} />
        <Button title="Pause" onPress={onPause} />
        {/* <Button title="Toggle" onPress={() => setPaused((state) => !state)} /> */}
        <Button title="Replay" onPress={rePlay} />
        <Text> </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: height / 3,
    width: width,
  },
});
export default TestScreen;
