import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';

import AppButton from '../Components/AppButton';
import Color from '../Config/Color';
import AppTextInput from '../Components/AppTextInput';
import {Post} from '../Backend/ImageStorage';
import useAuth from '../Auth/useAuth';

function UploadCaption({navigation, route}) {
  const {selected} = route.params;
  const {user} = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          style={{backgroundColor: 'transparent', marginHorizontal: 10}}
          textStyle={{color: Color.blue, fontSize: 18}}
          title={'Share'}
          onPress={() => onShare()}
        />
      ),
    });
  }, [navigation]);

  const onShare = () => {
    const caption = navigation.dangerouslyGetState().routes[1].params.caption;
    const {selected} = route.params;
    Post(selected, caption, user.email);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{uri: selected}}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <AppTextInput
        multiline
        onChangeText={(value) => navigation.setParams({caption: value})}
        placeholder="Caption"
        style={{marginHorizontal: 8}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
});

export default UploadCaption;
