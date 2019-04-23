const SCRIPTS = require('../data/scripts');

// const sampleScriptObject = {
//   name: 'Adlam',
//   ranges: [[125184, 125259], [125264, 125274], [125278, 125280]],
//   direction: 'rtl',
//   year: 1987,
//   living: true,
//   link: 'https://en.wikipedia.org/wiki/Fula_alphabets#Adlam_alphabet',
// };

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => count + (to - from), 0);
}

const scriptsSortedByCount = SCRIPTS.map((scr) => {
  return [scr.name, characterCount(scr)];
}).sort(([name1, count1], [name2, count2]) => count1 - count2);

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

console.log(characterScript('ß'.codePointAt(0)));

function dominantDirection(text) {
  const directions = { rtl: 0, ltr: 0 };
  for (let ch of text) {
    const code = ch.codePointAt(0);
    const script = characterScript(code);
    if (script) {
      directions[script.direction] += 1;
    } else {
      console.log(ch);
    }
  }

  return directions['ltr'] >= directions['rtl'] ? 'ltr' : 'rtl';
}

console.log(dominantDirection('Hello!'));
console.log(dominantDirection('Hey, مساء الخير'));
