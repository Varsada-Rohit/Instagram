import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Config/Color';

function ImageCropper({imageSelected, CropData}) {
  // const he
  const [width] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [originalH, setOriginalH] = useState();
  const [originalW, setOriginalW] = useState();
  const [imgRatio, setImgRatio] = useState();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [scale, setScale] = useState(2);
  const [cropping, setCropping] = useState(false);
  useEffect(() => {
    setCropping(false);
    getViewHW();
  }, [imageSelected]);

  const getViewHW = async () => {
    if (imageSelected) {
      await Image.getSize(imageSelected, async (w, h) => {
        console.log('image', w, h);
        setOriginalH(h);
        setOriginalW(w);
        let ratio = w / h;
        setImgRatio(ratio);
        if (ratio < 1) {
          console.log('3/4');
          setHeight((width * 4) / 3);
        } else if (ratio > 1) {
          setHeight((width * 3) / 4);
          console.log('4/3');
        } else {
          setHeight(width);
          console.log('1');
        }
      });
    }
  };

  const getImageHW = () => {
    let iHeight = width / imgRatio;
    if (iHeight <= height) {
      setImgWidth(width);
      setImgHeight(iHeight);
      console.log('full Width');
    } else {
      setImgWidth(height * imgRatio);
      setImgHeight(height);
      console.log('full heigh');
    }
  };

  let lastmovex = 0;
  let lastmovey = 0;
  let lastscale = 0;

  const onMove = (event) => {
    if (event.nativeEvent.changedTouches.length === 1) {
      if (lastmovex === 0) {
        lastmovex = event.nativeEvent.changedTouches[0].pageX;
      } else {
        //   console.log('lasmovex', lastmovex);
        //   console.log(lastmovex - event.nativeEvent.changedTouches[0].pageX);
        let l = event.nativeEvent.changedTouches[0].pageX - lastmovex + left;

        {
          l >= 0 && l <= width - width / scale && setLeft(l);
        }
      }
      if (lastmovey === 0) {
        lastmovey = event.nativeEvent.changedTouches[0].pageY;
      } else {
        let t = event.nativeEvent.changedTouches[0].pageY - lastmovey + top;
        {
          t >= 0 && t <= height - height / scale && setTop(t);
        }
      }
    } else {
      if (lastscale === 0) {
        lastscale = event.nativeEvent.changedTouches[0].pageY;
      } else {
        let s =
          (lastscale - event.nativeEvent.changedTouches[0].pageY) / 50 + scale;
        if (s >= 1) {
          setScale(s);
        }
      }
    }
  };

  const getHeightinImageR = (value) => {
    return (originalH * value) / imgHeight;
  };

  const getWidthinImageR = (value) => {
    return (originalW * value) / imgWidth;
  };

  return (
    <View style={{width: width, height: height, backgroundColor: Color.white}}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={{uri: imageSelected}}
        resizeMode="contain"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 5,
          backgroundColor: Color.mediumGrey,
        }}>
        {!cropping && (
          <MaterialCommunityIcons
            name={'crop-free'}
            size={30}
            onPress={() => {
              setCropping(true);
              getImageHW();
            }}
          />
        )}
        {cropping && (
          <MaterialCommunityIcons
            name={'cancel'}
            size={30}
            onPress={() => {
              setCropping(false);
              CropData(null);
            }}
          />
        )}
      </View>
      {cropping && (
        <View
          onStartShouldSetResponder={() => {
            return true;
          }}
          onResponderMove={(event) => onMove(event)}
          onResponderRelease={() => {
            lastmovex = 0;
            lastmovey = 0;
            lastscale = 0;
            // top and height
            let y = 0;
            let cropHeight = 0;
            if (height > imgHeight) {
              let topGap = (height - imgHeight) / 2;
              let topr = Math.round(top);
              if (topr < topGap) {
                y = 0;
                cropHeight = height / scale - topGap + topr;
              } else if (topr > topGap) {
                cropHeight = height / scale;
                y = topr - topGap;
              } else {
                y = 0;
                cropHeight = height / scale - topGap;
              }
            } else {
              y = Math.round(top);
              cropHeight = height / scale;
            }
            // left and width
            let x = 0;
            let cropWidth = 0;
            if (width > imgWidth) {
              let leftgap = (width - imgWidth) / 2;
              let leftr = Math.round(left);
              if (leftr < leftgap) {
                x = 0;
                cropWidth = width / scale - leftgap + leftr;
              } else if (leftr > leftgap) {
                cropWidth = width / scale;
                x = leftr - leftgap;
              } else {
                x = 0;
                cropWidth = width / scale - leftgap;
              }
            } else {
              x = Math.round(left);
              cropWidth = width / scale;
            }
            console.log('img wh', originalW, originalH);
            CropData({
              x: getWidthinImageR(x),
              y: getHeightinImageR(y),
              cropWidth: getWidthinImageR(cropWidth),
              cropHeight: getWidthinImageR(cropHeight),
              imgWidth,
              imgHeight,
            });
          }}
          style={{
            position: 'absolute',
            borderWidth: 5,
            left: left,
            top: top,
            width: width / scale,
            height: height / scale,
          }}></View>
      )}
    </View>
  );
}

export default ImageCropper;
