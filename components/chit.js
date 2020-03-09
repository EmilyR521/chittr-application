import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  chit: {
    flex: 1,
    backgroundColor: '#C0EEE8',
    marginVertical: 5,
    flexDirection: 'row',
  },
  chit_user_photo: {
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

export const Chit = ({user, chit, hasImage}) => {
  return (
    <View style={styles.chit}>
      <Image
        source={{
          uri:
            `http://10.0.2.2:3333/api/v0.0.5/user/${user.user_id}/photo?` +
            Date.now(),
        }}
        defaultSource={require('../assets/personDefault.png')}
        style={styles.chit_user_photo}
      />
      <View style={styles.chit_content}>
        <Text style={styles.user}>
          {' '}
          {user.given_name} {user.family_name}
        </Text>
        <Text> {chit.chit_content}</Text>
        <View
          style={{
            maxHeight: 300,
          }}>
          <Image
            source={{
              uri:
                `http://10.0.2.2:3333/api/v0.0.5/chit/${chit.chit_id}/photo?` +
                Date.now(),
            }}
            style={{height: 150, borderRadius: 10}}
          />
        </View>
      </View>
    </View>
  );
};
