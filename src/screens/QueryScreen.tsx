import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  CharacterCard,
  SubmitButton,
  toggleTheme,
  useAppSelector,
  useCharacters,
} from '..';

const ThemeSwitch: FC = () => {
  const theme = useAppSelector(state => state.preferences.theme);

  const dispatch = useDispatch();

  const handleToggleTheme = () => dispatch(toggleTheme());
  return (
    <View style={styles.themeSwitchContainer}>
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

const CharacterCards: FC = () => {
  const { data, isLoading, isError } = useCharacters();

  if (isLoading) {
    return <Text>Is loading</Text>;
  }

  if (isError) {
    return <Text>Is error</Text>;
  }

  return (
    <View style={styles.cardsContainer}>
      {data && data.results.length && (
        <FlatList
          data={data.results}
          numColumns={2}
          columnWrapperStyle={styles.containerWrapper}
          renderItem={({ item }) => <CharacterCard character={item} />}
        />
      )}
    </View>
  );
};

export const QueryScreen: FC = () => {
  const theme = useAppSelector(state => state.preferences.theme);

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        themeStyles[theme].container,
      ])}>
      <ThemeSwitch />
      <CharacterCards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  themeSwitchContainer: {
    padding: 16,
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
