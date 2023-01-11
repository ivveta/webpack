let operators = {};
operators.optional = 'The optional chaining (?.) operator works';

const optional = operators?.optional;
console.log(optional);

class Util {
  static id = Date.now();
}

console.log('Util id:', Util.id);
