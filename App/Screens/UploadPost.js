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

const width = Dimensions.get('window').width / 4;
function UploadPost() {
  const [images, setImages] = useState([]);
  const [last, setLast] = useState(null);

  const getInitailImages = () => {
    CameraRoll.getPhotos({first: 40}).then((r) => {
      setImages(r.edges);
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

  useEffect(() => {
    getInitailImages();
    // console.log(images);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        onEndReached={(value) => loadMore()}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.node.image.uri}
        numColumns={4}
        renderItem={({item, index}) => (
          <View style={styles.imageView}>
            <Image
              source={{uri: item.node.image.uri}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
      />
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
});

export default UploadPost;
