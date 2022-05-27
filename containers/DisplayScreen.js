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

import { Ionicons } from "@expo/vector-icons";

const DisplayScreen = ({ navigation, route }) => {
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
    };
    const setFullScreen = async () => {
      if (stateUser !== "admin") {
        const fullscreen = async () => {
          video.current?.presentFullscreenPlayer();
        };

        {
          Platform.OS === "android" ? fullscreen() : null;
        }
      }
    };
    setFullScreen();
    foo();
  }, []);

  const portrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  useEffect(() => {
    const navigationBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBackgroundColorAsync("black");
    };
    navigationBar();
  }, []);

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
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/dpcwqnqtf/video/upload/v1653117283/Video/Cendrillon_video.mp4",
        }}
        positionMillis={0}
        useNativeControls
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
