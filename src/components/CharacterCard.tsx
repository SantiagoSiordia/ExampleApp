import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '..';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
}

export interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const theme = useAppSelector(state => state.preferences.theme);

  return (
    <View style={themeStyles[theme].container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: character.image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={themeStyles[theme].textContainer}>
        <Text style={themeStyles[theme].text}>{character.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 120,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  imageContainer: {
    width: '100%',
    resizeMode: 'scale',
  },
});

const themeStyles: Record<'light' | 'dark', any> = {
  light: StyleSheet.create({
    container: {
      backgroundColor: 'white',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      maxWidth: '45%',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 1,
    },
    textContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      color: 'black',
      backgroundColor: 'white',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: '#01172f',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      maxWidth: '45%',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 1,
      borderColor: 'white',
    },
    textContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#01172f',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    text: {
      color: 'white',
    },
  }),
};
