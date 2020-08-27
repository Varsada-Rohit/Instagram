import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ImageEditor from '@react-native-community/image-editor';
import CameraRoll from '@react-native-community/cameraroll';
import Color from '../Config/Color';
import AppButton from '../Components/AppButton';
import ImageCropper from '../Components/ImageCropper';

import Animated from 'react-native-reanimated';

const width = Dimensions.get('window').width / 4;
function UploadPost({navigation}) {
  const [images, setImages] = useState([]);
  const [last, setLast] = useState(null);
  const [selected, setSelected] = useState();
  const [cropperSize, setCropperSize] = useState(0);
  const [AnimateOnScroll] = useState(new Animated.Value(0));

  const getInitailImages = () => {
    CameraRoll.getPhotos({first: 40}).then((r) => {
      setImages(r.edges);
      setSelected(r.edges[0].node.image.uri);
      navigation.setParams({imageSelected: r.edges[0].node.image.uri});
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

  const crop = async () => {
    const uri = navigation.dangerouslyGetState().routes[0].params.imageSelected;
    const data = navigation.dangerouslyGetState().routes[0].params.data;
    if (data) {
      const cropdata = {
        offset: {x: data.x, y: data.y},
        size: {width: data.cropWidth, height: data.cropHeight},
        // displaySize: {width: data.imgWidth, height: data.imgHeight},
        // resizeMode: 'contain',
      };
      ImageEditor.cropImage(uri, cropdata).then((image) => {
        console.log(image);
        navigation.navigate('UploadCaption', {selected: image});
      });
    } else {
      navigation.navigate('UploadCaption', {selected: uri});
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          style={{backgroundColor: 'transparent', marginHorizontal: 10}}
          textStyle={{color: Color.blue, fontSize: 18}}
          title={'Next'}
          onPress={() => {
            // const {params = {}} = navigation.state;
            // const routesLength = navigation.dangerouslyGetState().routes[0];
            // console.log(routesLength);
            crop();
            // navigation.navigate('UploadCaption', {selected: routesLength});
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getInitailImages();
    // navigation.setParams({imageSelected: selected});
  }, []);

  const CropData = (data) => {
    navigation.setParams({data: data});
    console.log(data);
  };
  const dc = Animated.diffClamp(AnimateOnScroll, 0, cropperSize);
  const animateTranslate = Animated.interpolate(dc, {
    inputRange: [0, cropperSize],
    outputRange: [0, -cropperSize],
  });
  // const animateTranslate = AnimateOnScroll.interpolate({
  //   inputRange: [0, cropperSize],
  //   outputRange: [0, -cropperSize],
  //   extrapolate: 'clamp',
  // });

  return (
    <View style={styles.container}>
      {/* <View style={{position:'relative',top:100,right:10,zIndex:1,backgroundColor:'grey'}} >
          <Entypo name="resize-100-" size={25} />
        </View> */}
      {/* <View style={styles.preview}>
          <Image
            source={{uri: selected}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View> */}

      <FlatList
        style={{paddingTop: cropperSize}}
        onScroll={(event) =>
          AnimateOnScroll.setValue(event.nativeEvent.contentOffset.y)
        }
        data={images}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.node.image.uri}
        numColumns={4}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item.node.image.uri);
              navigation.setParams({imageSelected: item.node.image.uri});
              AnimateOnScroll.setValue(0);
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
      <Animated.View
        onLayout={(event) => setCropperSize(event.nativeEvent.layout.height)}
        style={{
          top: 0,
          position: 'absolute',
          elevation: 30,
          transform: [
            {
              translateY: animateTranslate,
            },
          ],
          backgroundColor: 'transparent',
        }}>
        <ImageCropper imageSelected={selected} CropData={CropData} />
      </Animated.View>
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
