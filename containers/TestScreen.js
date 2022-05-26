import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
// import VideoPlayer from "expo-video-player";
// import * as ScreenOrientation from "expo-screen-orientation";
// import * as NavigationBar from "expo-navigation-bar";

const { width, height } = Dimensions.get("window");
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
    [0, 16, 18], // ok
    //Cependant Cendrillon, avec ses méchants habits, était cent fois plus belle que ses sœurs, quoique vêtues très magnifiquement.

    [21, 30, 33], //ok
    // Cendrillon les conseilla le mieux du monde, et s’offrit même à les coiffer ; ce qu’elles voulurent bien.
    [36, 49, 51], // ok
    //On rompit plus de douze lacets à force de les serrer pour leur rendre la taille plus menue, et elles étaient toujours devant leur miroir.
    [52, 64, 66], //  ok
    //« - Eh bien ! seras-tu bonne fille ? » dit sa marraine ; « je t’y ferai aller. » Puis continua :
    //« - Va dans le jardin et apporte-moi une citrouille. »
    [68, 79, 82], //  ok
    //Elle promit à sa marraine qu’elle ne manquerait pas de sortir du bal avant minuit. Elle part, ne se sentant pas de joie.
    [88, 97, 101], // ok
    //Le fils du roi la mit à la place la plus honorable, et ensuite la prit pour la mener danser. Elle dansa avec tant de grâce, qu’on l’admira encore davantage.
    [103, 113, 117], // ok
    //On demanda aux gardes de la porte du palais s’ils n’avaient point vu sortir une princesse : ils dirent qu’ils n’avaient vu sortir personne, qu’une jeune fille fort mal vêtue, et qui avait plus l’air d’une paysanne que d’une demoiselle.
    [123, 133, 140], // ok
    // et qu’assurément il était fort amoureux de la belle personne à qui appartenait la petite pantoufle.
    [143, 158, 162], // ok
    //Cendrillon, et approchant la pantoufle de son petit pied, il vit qu’elle y entrait sans peine, et qu’elle lui allait parfaitement.
    [163, 173, 182], //
  ];
  const [i, setI] = useState(0);
  const [code, setCode] = useState(timeCode[i][2] * 1000);
  const [reset, setReset] = useState(timeCode[i][1] * 1000);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        shouldPlay={true}
        isPlaying={true}
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
    width: height,
    height: width,
    // justifyContent: "center",
    backgroundColor: "white",
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
