import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Color from '../Config/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo' 

const width = Dimensions.get('window').width / 4;
function UploadPost() {
  const [images, setImages] = useState([]);
  const [last, setLast] = useState(null);
  const [selected, setSelected] = useState(); 

  const getInitailImages = () => {
    CameraRoll.getPhotos({first: 40}).then((r) => {
      setImages(r.edges);
      setSelected(r.edges[0].node.image.uri)
      if (r.page_info.has_next_page) {
        setLast(r.page_info.end_cursor);
      }
    })
  };

  const loadMore = () => {
    if (!last) {
      return;
    }
    CameraRoll.getPhotos({after: last, first: 40}).then((r) => {
      setImages(images.concat(r.edges));
      if (r.page_info.has_next_page) {
        setLast(r.page_info.end_cursor);
      } else {
        setLast(null);
      }
    });
  };

  useEffect(() => {
    getInitailImages();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
        
      <View style={styles.preview}>
        <View>
          <Entypo name="resize-100-" />
        </View>
        <Image source={{uri : selected} } style={{width:'100%',height:'100%'}} resizeMode="cover" />
      </View>
      <FlatList
        data={images}
        onEndReached={(value) => loadMore()}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.node.image.uri}
        numColumns={4}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() =>{setSelected(item.node.image.uri)}} disabled={(item.node.image.uri === selected)? true : false} >

          <View style={[styles.imageView,{opacity:(item.node.image.uri === selected)? 0.3 : 1}]} >
            <Image
              source={{uri: item.node.image.uri}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          </TouchableOpacity>
        )}
      />
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageView: {
    width: width,
    height: width,
    borderWidth: 0.8,
    borderColor: Color.white,
  },
  preview :{
    width:'100%', 
    height:400
  }
});

export default UploadPost;
