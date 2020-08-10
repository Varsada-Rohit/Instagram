import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Text} from 'react-native';

import AppButton from '../Components/AppButton';
import Color from '../Config/Color';
import AppTextInput from '../Components/AppTextInput';
import AuthFooter from '../Components/AuthFooter';
import ErrorText from '../Components/ErrorText';
import Auth from '../Auth/Auth';
import Loading from '../Components/Loading';

function CreateAccount({navigation}) {
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onNextBtn = async (email) => {
    setLoading(true);
    const result = await Auth.checkEmail(email);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    if (result.length === 0) {
      navigation.navigate('Password', {email});
      setLoading(false);
    } else {
      setError('Email already exist');
      setLoading(false);
    }
  };

  return (
    <>
      <Loading visible={loading} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.body}>
            <Image
              style={styles.accountImg}
              source={require('../Assests/Account.png')}
              resizeMode="contain"
            />
            <View style={styles.tab}>
              <View
                style={{
                  width: '50%',
                  borderBottomWidth: phone ? 1 : 2,
                  opacity: phone ? 0.5 : 1,
                }}>
                <AppButton
                  style={styles.tabBtn}
                  textStyle={styles.tabBtnText}
                  title="EMAIL"
                  onPress={() => setPhone(false)}
                />
              </View>
              <View
                style={{
                  width: '50%',
                  borderBottomWidth: phone ? 2 : 1,
                  opacity: phone ? 1 : 0.5,
                }}>
                <AppButton
                  style={styles.tabBtn}
                  textStyle={styles.tabBtnText}
                  title="PHONE"
                  onPress={() => setPhone(true)}
                />
              </View>
            </View>
            <ErrorText visible="true" error={error} />
            {!phone && (
              <AppTextInput
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
              />
            )}
            {phone && (
              <AppTextInput placeholder="Phone" keyboardType="numeric" />
            )}
            {phone && (
              <Text
                style={{
                  color: Color.grey,
                  textAlign: 'center',
                  marginVertical: 5,
                }}>
                You may receive SMS updates from Instagram and can opt out at
                any time
              </Text>
            )}
            <AppButton
              title="Next"
              disabled={phone ? true : email ? false : true}
              onPress={() => onNextBtn(email)}
            />
          </View>
        </ScrollView>
        <AuthFooter
          style={styles.footer}
          text="Already have an account? "
          btnText="Log in."
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  accountImg: {
    width: '40%',
    height: 150,
    alignSelf: 'center',
  },
  tab: {
    width: '100%',
    flexDirection: 'row',
  },
  tabBtn: {
    backgroundColor: 'transparent',
  },
  tabBtnText: {
    color: Color.black,
    fontWeight: 'normal',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    borderTopColor: Color.mediumGrey,
    borderTopWidth: 1,
  },
});

export default CreateAccount;
