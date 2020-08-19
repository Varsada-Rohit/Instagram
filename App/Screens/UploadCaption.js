import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import AppButton from '../Components/AppButton';
import Color from '../Config/Color';

function UploadCaption({navigation, route}) {
  const {selected} = route.params;
  console.log(selected);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          style={{backgroundColor: 'transparent', marginHorizontal: 10}}
          textStyle={{color: Color.blue, fontSize: 18}}
          title={'Share'}
          onPress={() => console.log('yup')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: selected}}
        style={{width: '100%', height: 450}}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
  },
});

export default UploadCaption;
