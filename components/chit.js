import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  chit: {
    backgroundColor: '#C0EEE8',
    marginVertical: 5,
    flexDirection: 'row',
  },
  chit_photo: {
    width: 60,
    height: 60,
  },
  chit_content: {
    flexDirection: 'column',
  },
  user: {
    fontSize: 26,
  },
});

export const Chit = ({user, chit_content} ) => {
  return (
    <View style={styles.chit}>
      <Image
        style={styles.chit_photo}
        source={require('./../assets/personDefault.png')}
      />
      <View style={styles.chit_content}>
        <Text style={styles.user}>
          {' '}
          {user.given_name} {user.family_name}
        </Text>
        <Text> {chit_content}</Text>
      </View>
    </View>
  );
}
