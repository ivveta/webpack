import { Post } from './Post';
// json в webpack парсится по-умолчанию без доп настроек
import json from './assets/json';
import './styles/styles.css';
import DogImage from './assets/dog.png';

const post = new Post('webpack post title', DogImage);

console.log(`Post to string ${post.toString()}`);
console.log('JSON: ', json);
