import storage from '@react-native-firebase/storage';

const UploadImage = async (uri) => {
  const result = await storage().ref('/ProfilePhoto').putFile(uri);
  return result;
};

export default {UploadImage};
