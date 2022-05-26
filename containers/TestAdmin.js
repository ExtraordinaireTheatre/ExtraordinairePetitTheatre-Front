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

import { Magnetometer } from "expo-sensors";

import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import StoryScreen from "./StoryScreen";

import { Ionicons } from "@expo/vector-icons";
    
// const width = Dimensions.get("window").height;
// const height = Dimensions.get("window").width;

const TestAdmin = ({  navigation: { goBack } , route }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
    // NavigationBarVisibility='hidden';
  const timeCode = [
    [0, 16, 18], //Cependant Cendrillon, avec ses méchants habits, était cent fois plus belle que ses sœurs, quoique vêtues très magnifiquement.
    [21, 30, 33], // Cendrillon les conseilla le mieux du monde, et s’offrit même à les coiffer ; ce qu’elles voulurent bien.
    [36, 49, 51], //On rompit plus de douze lacets à force de les serrer pour leur rendre la taille plus menue, et elles étaient toujours devant leur miroir.
    [52, 64, 66], //« - Eh bien ! seras-tu bonne fille ? » dit sa marraine ; « je t’y ferai aller. » Puis continua :
    //« - Va dans le jardin et apporte-moi une citrouille. »
    [68, 79, 82], //Elle promit à sa marraine qu’elle ne manquerait pas de sortir du bal avant minuit. Elle part, ne se sentant pas de joie.
    [88, 97, 101], //Le fils du roi la mit à la place la plus honorable, et ensuite la prit pour la mener danser. Elle dansa avec tant de grâce, qu’on l’admira encore davantage.
    [103, 113, 117], //On demanda aux gardes de la porte du palais s’ils n’avaient point vu sortir une princesse : ils dirent qu’ils n’avaient vu sortir personne, qu’une jeune fille fort mal vêtue, et qui avait plus l’air d’une paysanne que d’une demoiselle.
    [123, 133, 140], // et qu’assurément il était fort amoureux de la belle personne à qui appartenait la petite pantoufle.
    [143, 158, 162], //Cendrillon, et approchant la pantoufle de son petit pied, il vit qu’elle y entrait sans peine, et qu’elle lui allait parfaitement.
    [163, 173, 182], //
  ];
  const [i, setI] = useState(0);
  const [code, setCode] = useState(timeCode[i][2] * 1000);
  const [reset, setReset] = useState(timeCode[i][1] * 1000);

  const [stateUser, setUser] = useState("user");

// HIDE BOTTOM BAR ON ANDROID DEVICE
  useEffect(() => {
    const navigationBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden");
    };
    {Platform.OS === 'android' &&
        navigationBar();}
  }, []);
// QUIT VIDEO AND MAKE PORTRAIT_UP
  const back = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };
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
        positionMillis={0}
        useNativeControls={false}
        resizeMode="cover"
        onPlaybackStatusUpdate={(status) => {
          setTime(status.positionMillis);
          {i < timeCode.length - 1 &&
              time >= code &&
              video.current.playFromPositionAsync(reset);
          }
        }}
      />
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          back();
          goBack();
        //   back();
        }}>
        <Ionicons
          name="arrow-back-outline"
          size={22}
          color='white'
        />
      </TouchableOpacity>
      <View style={styles.ViewButtons}>

        <Button
            style={styles.button}
            title={isPlaying ? "Stop" : "Play"}
            onPress={() => {
              isPlaying
                ? video.current.pauseAsync() && setIsPlaying(!isPlaying)
                : video.current.playAsync() && setIsPlaying(!isPlaying);
            }}
          />
          <Button
            style={styles.button}
            title={i === timeCode.length - 1 ? "" : "next"}
            onPress={() => {
              setCode(timeCode[i + 1][2] * 1000);
              setReset(timeCode[i + 1][1] * 1000);
              {i + 1 === timeCode.length + 1 ? i : setI(i + 1);}
            }}
          />
            <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: "rgb(226, 218, 210)",
            }}>
            {time}
          </Text>
      </View>
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    //   borderWidth:4,
    //   borderColor:'yellow',
      flex:1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  video: {
      height: '100%',
      width: '90%',
    //   borderWidth:4,
    //   borderColor:'green',
      position:'relative'
  },
  goBack:{
    position:'absolute',
    top: 10,
    left: 10,
    color:'white'
  },
  ViewButtons: {
    flex:1,
    backgroundColor:'black',
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default TestAdmin;