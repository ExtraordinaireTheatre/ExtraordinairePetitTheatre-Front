import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View , Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';


export default function Curtain({navigation}) {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
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
        onAnimationFinish={()=>{
            navigation.navigate("TestUser", { bookData: route.params.bookData });
            // <Text style={{backgroundColor:'white'}}>fin de l'animation</Text>
        }}
      />
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'black',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
});
