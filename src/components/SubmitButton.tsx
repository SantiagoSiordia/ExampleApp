import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

export type SubmitButtonProps = TouchableOpacityProps & {
  text: string;
};

export const SubmitButton: FC<SubmitButtonProps> = ({ text, ...props }) => {
  return (
    <View style={buttonStyles.container}>
      <TouchableOpacity
        style={StyleSheet.flatten([
          buttonStyles.button,
          {
            backgroundColor: props.disabled
              ? 'rgba(80, 113, 175, 0.4)'
              : 'rgb(80, 113, 175)',
          },
        ])}
        activeOpacity={0.7}
        {...props}>
        <Text style={buttonStyles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    marginHorizontal: 48,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    marginTop: 32,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});
