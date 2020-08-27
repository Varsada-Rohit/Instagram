import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppButton from '../Components/AppButton';
import Color from '../Config/Color';

function UserProfile() {
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 10}}>
        <View style={styles.header}>
          <Image
            source={require('../Assests/Profile.png')}
            style={styles.profile}
          />

          <View style={styles.countsView}>
            <View style={styles.counts}>
              <Text style={styles.countNumber}>10</Text>
              <Text style={styles.countInfo}>Post</Text>
            </View>
            <View style={styles.counts}>
              <Text style={styles.countNumber}>1.1m</Text>
              <Text style={styles.countInfo}>Follower</Text>
            </View>
            <View style={styles.counts}>
              <Text style={styles.countNumber}>100</Text>
              <Text style={styles.countInfo}>Following</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.nameBio}>Rohit Varsada</Text>
          <Text style={styles.nameBio}>Bio</Text>
        </View>
        <AppButton
          style={{
            height: 30,
            backgroundColor: Color.lightGrey,
            borderWidth: 1,
            borderColor: Color.mediumGrey,
          }}
          textStyle={{color: Color.black, fontWeight: '100', fontSize: 16}}
          title="Edit Profile"
        />
      </View>

      <MaterialCommunityIcons
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          padding: 5,
          textAlign: 'center',
          borderColor: Color.mediumGrey,
        }}
        name="grid"
        size={25}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
  },
  profile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  counts: {
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 19,
    fontWeight: '700',
  },
  countInfo: {},
  countsView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  nameBio: {
    fontSize: 18,
  },
});

export default UserProfile;
