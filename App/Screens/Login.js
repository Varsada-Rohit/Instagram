import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, ScrollView} from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppPasswordInput from '../Components/AppPasswordInput';
import AppButton from '../Components/AppButton';
import Color from '../Config/Color';
import AuthFooter from '../Components/AuthFooter';
import auth from '../Auth/Auth';
import ErrorText from '../Components/ErrorText';
import useAuth from '../Auth/useAuth';
import Loading from '../Components/Loading';

function Login({navigation}) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();

  const onLoginBtn = async (info) => {
    setLoading(true);
    const result = await auth.login(info);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    login(result.user);
  };

  return (
    <>
      <Loading visible={loading} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <Image
            style={{width: '50%', height: 100, alignSelf: 'center'}}
            resizeMode={'contain'}
            source={require('../Assests/instagram.png')}
          />
          <ErrorText visible={true} error={error} />
          <AppTextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
          />
          <AppPasswordInput
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
          />
          <AppButton
            title="Log in"
            onPress={() => onLoginBtn({email, password})}
          />
          <AuthFooter
            text="Forgot your login details? "
            btnText="Get help signing in."
          />
          <AuthFooter text="OR" />
          <AuthFooter btnText="Log in with Facebook" />
        </ScrollView>
        <AuthFooter
          style={styles.footer}
          text="Don't have an account? "
          btnText="Sign up."
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footer: {
    borderTopColor: Color.mediumGrey,
    borderTopWidth: 1,
  },
});

export default Login;
