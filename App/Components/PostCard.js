import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import Color from '../Config/Color';
import ProfileCircle from './ProfileCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import img from '../Assests/Post.jpg';
import Animated from 'react-native-reanimated';

let dimension = Dimensions.get('window');
let imgHeight = Math.round(dimension.width + 1);
let imgWidth = dimension.width * 0.5;

const {height, width} = Image.resolveAssetSource(img);
console.log(height);

function PostCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfileCircle />
        <Text style={styles.userName}>user_name</Text>
      </View>
      <View style={styles.view}>
        <Image
          style={styles.post}
          // resizeMode="cover"
          source={require('../Assests/Post.jpg')}
        />
      </View>

      {/* <View style={styles.footer}>
        <MaterialCommunityIcons
          name={'heart-outline'}
          size={30}
          style={{marginHorizontal: 8}}
        />
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
      </View> */}
      {/* <View style={styles.caption}>
        <Text style={styles.userName}>1000 likes</Text>
        <Text>
          <Text style={styles.userName}>user_name </Text>
          <Text>caption of the Post</Text>
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
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
  view: {
    width: '100%',
    height: 600,
  },
  post: {
    flex: 1,
    width: undefined,
    height: undefined,
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
