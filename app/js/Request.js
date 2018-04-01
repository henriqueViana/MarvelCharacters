import axios from 'axios';
import { URL, APIKEY, TIMESTAMP, HASH, LIMIT } from './helpers/constants';

class Request {

    static getAllCharacters() {
        return axios.get(`${URL}/characters?ts=${TIMESTAMP}&limit=${LIMIT}&apikey=${APIKEY}&hash=${HASH}`)
    }

    static getSearchedCharacters(searched) {
        return axios.get(`${URL}/characters?nameStartsWith=${searched}&ts=${TIMESTAMP}&limit=${LIMIT}&apikey=${APIKEY}&hash=${HASH}`)
    }

    static getPaginationCharacters(offset) {
        return axios.get(`${URL}/characters?offset=${offset}&ts=${TIMESTAMP}&limit=${LIMIT}&apikey=${APIKEY}&hash=${HASH}`)
    }

    static getSearchAndPaginationCharacters(searched, offset) {
        return axios.get(`${URL}/characters?offset=${offset}&nameStartsWith=${searched}&ts=${TIMESTAMP}&limit=${LIMIT}&apikey=${APIKEY}&hash=${HASH}`)
    }

}

export default Request;