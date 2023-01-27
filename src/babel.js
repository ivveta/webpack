let operators = {};
operators.optional = 'The optional chaining (?.) operator works';

const optional = operators?.optional;
console.log(optional);

class Util {
  static id = Date.now();
}

console.log('Util id:', Util.id);

const unused = '45645';
console.log(unused);

// динамический импорт, подгружает lodash в отдельном чанке
import('lodash').then(({ default: _ }) => {
  console.log('Lodash', _.random(0, 42, true));
});
