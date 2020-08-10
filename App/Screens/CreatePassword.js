import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import AppTextInput from '../Components/AppTextInput';
import AppPasswordInput from '../Components/AppPasswordInput';
import AppButton from '../Components/AppButton';
import ErrorText from '../Components/ErrorText';
import auth from '../Auth/Auth';
import useAuth from '../Auth/useAuth';
import Loading from '../Components/Loading';

function CreatePassword({route, navigation}) {
  const {email} = route.params;
  const {register} = useAuth();

  const [dname, setDname] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignupBtn = async (info) => {
    setLoading(true);
    const result = await auth.register(info);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigation.navigate('SetProfile');
  };

  return (
    <>
      <Loading visible={loading} />
      <View style={styles.container}>
        <Text style={styles.title}>NAME AND PASSWORD</Text>

        <ErrorText visible={true} error={error} />
        <AppTextInput
          placeholder="Full name"
          onChangeText={(value) => setDname(value)}
        />
        <AppPasswordInput
          placeholder="Password"
          onChangeText={(value) => setpassword(value)}
        />
        <AppButton
          title="Signup"
          onPress={() => onSignupBtn({email, dname, password})}
          disabled={!dname || !password ? true : false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginVertical: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CreatePassword;
