import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Color from '../Config/Color';
import ProfileCircle from './ProfileCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import img from '../Assests/Post.jpg';
import Animated, {set, Easing} from 'react-native-reanimated';

let dimension = Dimensions.get('window');
let imgHeight = Math.round(dimension.width + 1);
let imgWidth = dimension.width * 0.5;

let lastTap = 0;

function PostCard() {
  const [scale] = useState(new Animated.Value(0));
  const [animate, setAnimate] = useState(false);
  const [like, setLike] = useState(false);

  const AnimateScale = () => {
    scale.setValue(0);
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  };

  const handleDoubleTap = () => {
    let now = Date.now();
    const Double_Press_Delay = 300;
    if (lastTap && now - lastTap < Double_Press_Delay) {
      setAnimate(true);
      AnimateScale();
      if (!like) {
        onlike();
      }
    } else {
      lastTap = now;
    }
  };

  const onlike = () => {
    setLike(!like);
  };

  const spin = scale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 1],
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileCircle />
        <Text style={styles.userName}>user_name</Text>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => handleDoubleTap()}>
          <Image
            style={styles.post}
            // resizeMode="cover"
            source={require('../Assests/Post.jpg')}
          />
        </TouchableWithoutFeedback>
        {animate && like && (
          <LottieView
            source={require('../Assests/like-animation.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => setAnimate(false)}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Animated.View style={{transform: [{scale: spin}]}}>
          <MaterialCommunityIcons
            name={like ? 'heart' : 'heart-outline'}
            size={30}
            onPress={() => {
              AnimateScale();
              onlike();
            }}
            color={like ? 'red' : 'black'}
            style={{marginHorizontal: 8}}
          />
        </Animated.View>
        <FontAwesome5
          name={'comment'}
          size={25}
          style={{transform: [{rotateY: '180deg'}]}}
        />
        <Ionicons
          name="paper-plane-outline"
          size={30}
          style={{marginHorizontal: 8}}
        />
        <View style={{position: 'absolute', right: 0, marginHorizontal: 15}}>
          <FontAwesome name="bookmark-o" size={25} />
        </View>
      </View>
      <View style={styles.caption}>
        <Text style={styles.userName}>1000 likes</Text>
        <Text>
          <Text style={styles.userName}>user_name </Text>
          <Text>caption of the Post</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomColor: Color.mediumGrey,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
  },

  post: {
    flex: 1,
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  caption: {
    paddingHorizontal: 10,
  },
});

export default PostCard;
