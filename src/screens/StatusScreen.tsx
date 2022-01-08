import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getValueFor } from '..';

export const StatusScreen: FC = () => {
  const [user, setUser] = useState<null | string>(null);
  const [card, setCard] = useState<null | string>(null);
  const [status, setStatus] = useState<string>('loading');

  const getStatus = async () => {
    try {
      setStatus('loading');
      const securedUser = await getValueFor('user');
      const securedCard = await getValueFor('card');
      setUser(securedUser);
      setCard(securedCard);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Status</Text>
      <Text>User</Text>
      <Text>{status === 'loading' ? 'loading' : user}</Text>
      <Text>Card</Text>
      <Text>{status === 'loading' ? 'loading' : card}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
  },
  titleText: {
    fontSize: 60,
    textAlign: 'center',
    color: 'black',
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginBottom: 32,
  },
});
