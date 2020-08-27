import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const UploadImage = async (uri, name) => {
  const result = await storage()
    .ref('/ProfilePhotos/' + name)
    .putFile(uri);
  return result;
};

export const Post = async (uri, caption, email) => {
  const result = await firestore().collection('Posts').add({
    user: email,
    post: '',
    caption: caption,
    time: firestore.FieldValue.serverTimestamp(),
  });
  const status = await storage()
    .ref('/Posts/' + result.id)
    .putFile(uri);
};
