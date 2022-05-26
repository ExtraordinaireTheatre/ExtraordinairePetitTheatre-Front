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
import LottieView from 'lottie-react-native';

import { Magnetometer } from "expo-sensors";

import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import StoryScreen from "./StoryScreen";
// import LottieView from 'lottie-react-native';

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
    
// const width = Dimensions.get("window").height;
// const height = Dimensions.get("window").width;

const TestUser = ({  navigation: { goBack } , route }) => {
  const video = useRef(null);
  // const animation = useRef(null);
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
        setStepForward(true)
        setCode(timeCode[i + 1][2] * 1000);
        setReset(timeCode[i + 1][1] * 1000);
        {i + 1 === timeCode.length  ? setI(timeCode.length) : setI(i + 1);}
      }
    };
    magnetFunction();
    return () => {
      Magnetometer.removeAllListeners();
      setStepForward(false)
    };
  }, [data]);
// HIDE BOTTOM BAR ON ANDROID DEVICE
  useEffect(() => {
    const navigationBar = async () => {
      await NavigationBar.setVisibilityAsync('hidden');
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
  const handleFinish = () =>{
    setFinish(true);
  }
  return (!finish ? (
    <View style={styles.animationContainer}>
      <StatusBar hidden={true}/>
      <LottieView
    
        autoPlay
        resizeMode='cover'
        loop={false}
        ref={animation}
        style={{
          flex:1,
          backgroundColor: '#000000',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/Curtain.json')}
        onAnimationFinish={()=>{ handleFinish();
            // navigation.navigate("TestUser", { bookData: route.params.bookData });
            // <Text style={{backgroundColor:'white'}}>fin de l'animation</Text>
        }}
        
      />
      </View>)
  :
    (<View style={styles.container}>

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
          // navigation.navigate("Story", { bookData: route.params.bookData });
          goBack();
        }}>
        <Ionicons
          name="arrow-back-outline"
          size={22}
          color='white'
        />
      </TouchableOpacity>
      <View style={stepForward && { position:'absolute', top:10, right:10}}>
        <AntDesign
          name="stepforward"
          size={22}
          color='white'
        />
      </View>
        
    </View>)
    )
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#000000',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
      backgroundColor:'#000000',
      // borderWidth:4,
      // borderColor:'red',
      flex:1,
  },
  video: {
      height: '100%',
      width: '100%',
      // borderWidth:4,
      // borderColor:'blue',
      position:'relative'

  },
  goBack:{
    position:'absolute',
    top: 10,
    left: 10,
    color:'white'
  }
//   ViewButtons: {
//     height: "50%",
//     paddingTop: 40,
//     // borderColor: "yellow",
//     // borderWidth: 4,
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   button: {
//     marginTop: 150,
//   },
//   goBack: {
//     backgroundColor: "rgb(226, 218, 210)",
//     borderWidth: 1,
//     borderRadius: 50,
//     padding: 15,
//     color: "rgb(165, 81, 69)",
//     borderWidth: 0,
//   },
});

export default TestUser;
