import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Color from '../Config/Color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppButton from '../Components/AppButton';

const width = Dimensions.get('window').width / 4;
function UploadPost({navigation}) {
  const [images, setImages] = useState([]);
  const [last, setLast] = useState(null);
  const [selected, setSelected] = useState();

  const getInitailImages = () => {
    CameraRoll.getPhotos({first: 40}).then((r) => {
      setImages(r.edges);
      setSelected(r.edges[0].node.image.uri);
      if (r.page_info.has_next_page) {
        setLast(r.page_info.end_cursor);
      }
    });
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          style={{backgroundColor: 'transparent', marginHorizontal: 10}}
          textStyle={{color: Color.blue, fontSize: 18}}
          title={'Next'}
          onPress={() => navigation.navigate('UploadCaption', {selected})}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getInitailImages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
      <ScrollView nestedScrollEnabled>
        {/* <View style={{position:'relative',top:100,right:10,zIndex:1,backgroundColor:'grey'}} >
          <Entypo name="resize-100-" size={25} />
        </View> */}
        <View style={styles.preview}>
          <Image
            source={{uri: selected}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View>
          <FlatList
            data={images}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item.node.image.uri}
            numColumns={4}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item.node.image.uri);
                }}
                disabled={item.node.image.uri === selected ? true : false}>
                <View
                  style={[
                    styles.imageView,
                    {opacity: item.node.image.uri === selected ? 0.3 : 1},
                  ]}>
                  <Image
                    source={{uri: item.node.image.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
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
  preview: {
    width: '100%',
    height: 400,
  },
});

export default UploadPost;
