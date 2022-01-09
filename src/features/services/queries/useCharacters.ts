import { useQuery } from 'react-query';
import { getCharacters } from '../api';

export const useCharacters = () => {
  return useQuery('Characters', getCharacters);
};
