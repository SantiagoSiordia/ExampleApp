import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const BackgroundDesign: FC = () => {
  return (
    <View style={backgroundStyles.edge}>
      <View style={backgroundStyles.firstBall} />
      <View style={backgroundStyles.secondBall} />
    </View>
  );
};

const backgroundStyles = StyleSheet.create({
  firstBall: {
    backgroundColor: '#5071AF',
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    position: 'absolute',
    top: -33,
    left: -40,
    zIndex: -1,
  },
  secondBall: {
    backgroundColor: '#4EA8DB',
    width: 272,
    height: 272,
    borderRadius: 272 / 2,
    position: 'absolute',
    top: -65,
    right: -34,
    zIndex: -1,
  },
  edge: {
    width: '100%',
    height: '100%',
    borderColor: '#4EA8DB',
    borderWidth: 4,
    position: 'absolute',
    zIndex: -1,
  },
});
