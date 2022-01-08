import { MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps, FC } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

export type InputProps = TextInputProps & {
  icon: MaterialIconName;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
};

export const Input: FC<InputProps> = ({
  icon,
  name,
  placeholder = null,
  error = false,
  errorMessage,
  ...props
}) => {
  return (
    <View style={formStyles.container}>
      <Text
        style={StyleSheet.flatten([
          formStyles.label,
          error ? formStyles.errorTextColor : {},
        ])}>
        {name}
      </Text>
      <View
        style={StyleSheet.flatten([
          formStyles.inputContainer,
          error ? formStyles.inputContainerError : {},
        ])}>
        <View style={formStyles.iconContainer}>
          <MaterialIcons
            name={icon}
            size={24}
            color={error ? '#c42348' : 'black'}
          />
        </View>
        <TextInput
          style={StyleSheet.flatten([
            formStyles.input,
            error ? formStyles.errorTextColor : {},
          ])}
          placeholder={placeholder ?? name}
          placeholderTextColor="#75757F"
          {...props}
        />
      </View>
      {error && (
        <Text style={formStyles.errorMessage}>Error: {errorMessage}</Text>
      )}
    </View>
  );
};

const formStyles = StyleSheet.create({
  container: {
    marginHorizontal: 48,
    marginBottom: 8,
  },
  label: {
    color: 'black',
    fontSize: 12,
    marginLeft: 15,
  },
  inputContainer: {
    backgroundColor: '#A5D1FA',
    height: 30,
    borderRadius: 15,
    paddingRight: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
  },
  errorMessage: {
    color: '#c42348',
    fontSize: 12,
    marginLeft: 15,
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: '#c42348',
  },
  errorTextColor: {
    color: '#c42348',
  },
});
