import axios from 'axios';
import { Character } from '../../..';

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: null | string;
    prev: null | string;
  };
  results: Array<Character>;
}

export const getCharacters = async () => {
  const response = await axios.get<CharactersResponse>(
    'https://rickandmortyapi.com/api/character',
    {
      params: {
        page: 1,
      },
    },
  );

  return response.data;
};
