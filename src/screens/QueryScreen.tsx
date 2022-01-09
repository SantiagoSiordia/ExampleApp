import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SubmitButton, toggleTheme, useAppSelector } from '..';

export const QueryScreen: FC = () => {
  const theme = useAppSelector(state => state.preferences.theme);

  const dispatch = useDispatch();

  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        themeStyles[theme].container,
      ])}>
      <Text style={StyleSheet.flatten([themeStyles[theme].text])}>
        Query Screen
      </Text>
      <Text style={StyleSheet.flatten([themeStyles[theme].text])}>
        Current theme: {theme}
      </Text>
      <SubmitButton text="Toggle theme" onPress={handleToggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const themeStyles: Record<'light' | 'dark', any> = {
  light: StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    text: {
      color: 'black',
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: '#01172f',
    },
    text: {
      color: 'white',
    },
  }),
};
