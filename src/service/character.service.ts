// In this service the connection with the api is made through http calls.
// Axios has been used to make http calls

import axios from 'axios';

import { Character } from '@/interface/character';

const api = 'https://rickandmortyapi.com/api/character';

const apiEpisode = 'https://rickandmortyapi.com/api/episode';

class CharacterService {
  // I get the character with the id
  public getCharacter(id: string) {
    return axios.get(`${api}/${id}`);
  }
  // I get the characters with the ids
  public getCharactersID(ids: string) {
    return axios.get(`${api}/${ids}`);
  }
  // I get a random character
  public async getRandomCharacter() {
    let randomString = ``;
    await axios.get(`${api}`).then( (response) => {
      const max: number = response.data.info.count;
      let random;

      random = Math.floor(Math.random() * max + 1);
      randomString = `${random}`;
    });

    return axios.get<Character[]>(`${api}/${randomString}`);
  }
  // I get 10 randoms characters
  public async getRandomCharacters() {
    let randomString = ``;
    await axios.get(`${api}`).then( (response) => {
      const max: number = response.data.info.count;
      let random;

      for (let i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * max + 1);
        randomString = `${randomString},${random}`;
      }
    });

    return axios.get<Character[]>(`${api}/${randomString}`);
  }
  // I get a random character from an url
  public getRelevant(url: string) {
    return axios.get(`${url}`);
  }
  // I get all the characters
  public getCharacters() {
    return axios.get(`${api}`);
  }
  // I get the episodes in which a character appears
  public getEpisode(ids: string) {
    return axios.get(`${apiEpisode}/${ids}`);
  }
}

export const characterService = new CharacterService();
