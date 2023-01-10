import * as $ from 'jquery';
import { Post } from '@models/Post';
// json в webpack парсится по-умолчанию без доп настроек
import json from '@assets/json';
import xml from '@assets/data.xml';
import csv from '@assets/data.csv';
import '@styles/styles.css';
import '@styles/less.less';
import DogImage from '@assets/dog';

const post = new Post('webpack post title', DogImage);

$('pre').addClass('code').html(post.toString());

console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv);
