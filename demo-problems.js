function solve(a0, a1, a2, b0, b1, b2) {
    var aliceScore = 0;
    var bobScore = 0;
    if (a0 < b0)++bobScore;
    if (a1 < b1)++bobScore;
    if (a2 < b2)++bobScore;
    if (a0 > b0)++aliceScore;
    if (a1 > b1)++aliceScore;
    if (a2 > b2)++aliceScore;

    return [aliceScore, bobScore];
}


function aVeryBigSum(n, ar) {
  return ar.reduce((accum, val) => accum + val, 0)
}


const matrixSolverUper = (n, matrix) => {
  const sumArray = arr => arr.reduce((acc, val) => acc + val, 0);

  const { valy1, valy2 } = matrix.reduce((accum, val) => {
    accum.valy1.push(val[accum.pos1]);
    accum.valy2.push(val[accum.pos2]);
    accum.pos1 = ++accum.pos1;
    accum.pos2 = --accum.pos2;
    return accum;
  }, { pos1: 0, pos2: matrix.length - 1, valy1: [], valy2: [] });
  return Math.abs(sumArray(valy1) - sumArray(valy2));
}

const rowBuilder = (idx, n) => {
  const space = ` `;
  const pound = `#`;
  const spacer = (idx, n) => n - idx;
  const derps = Array(n).fill(space, 0, spacer(idx, n)).fill(pound, spacer(idx, n), n).join('')
  return `${derps}`;
}

const stairCaseBuilder = n => {
  const derps = [];
  for (let i = 1; i <= n; i++) {
    derps.push(rowBuilder(i, n));
  }
  return derps.join('\n');
};

const miniMaxSummer = arr => {
  const derps = (pos, arr) => arr.reduce((acc, num, idx) => {
    return pos === idx ? acc : acc + num;
  }, 0);

  const { min, max } = arr.map((cv, idx, originalArray) => 
    derps(idx, originalArray)).reduce((acc, val) => {
        if (acc.min === null || acc.min > val) acc.min = val;
        if (acc.max === null || acc.max < val) acc.max = val;
        return acc;
    }, { min: null, max: null })
  return `${min} ${max}`;
}


function birthdayCakeCandles(n, arr) {
  const { frequency } = arr.reduce((acc, val) => {
    if (val > acc.highWater) {
      acc.highWater = val;
      acc.frequency = 1;
      return acc;
    };
    if (val === acc.highWater) {
      acc.frequency = acc.frequency + 1;
    }
    return acc;
}, { frequency: 0, highWater: 0 });
  return frequency;
}

const convertTime = s => {
  var [hours, minutes, derp] = s.split(':');
  const [a, b, c, d] = derp.split('');
  const seconds = `${a}${b}`;
  const modifier = `${c}${d}`;
  if (hours === '12') {
      hours = '00';
  }

  if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:${seconds}`;
}

const dupeDetector = (s, n) => {
  const strLength = s.length;
  const count = s.replace(/[^a]/g, "").length;
  const derps = Math.floor(n / strLength);

  const remainingStr = n - (strLength * derps);
  const remainingSubStr = s.substring(0, (remainingStr));

  const remainingA = remainingSubStr.replace(/[^a]/g, "").length;
  return (count * derps) + remainingA;
}


 
function super_reduced_string(s) {
  for (var i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      return super_reduced_string(s.replace(s[i] + s[i], ''));
    }
  }
  return s || 'Empty String';
}

const detectCaps = s => s.split('').reduce((acc, val) => {
  if (val === val.toUpperCase()) {
    acc = acc + 1;
  }
  return acc;
}, 1);

const gradingStudents = grades => grades.map(grade => {
  const round5 = x => Math.ceil(x/5)*5;
  const subtract = x => y => x - y;
  if(grade <= 37) {
    return grade;
  };
  const nextMultOf5 = round5(grade);
  if (subtract(nextMultOf5)(grade) < 3){
    return nextMultOf5;
  }
  return grade;
});

function caesarShift (s, amount) {
  if (amount < 0) return caesarShift(str, amount + 26);

  const shifter = (char, idx) => {
    if(char.match(/[a-z]/i)) {
      let code = s.charCodeAt(idx);
      if ((code >= 65) && (code <= 90)) {
        char = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if ((code >= 97) && (code <= 122)) {
        char = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }

    return char
  }
  
  return s
  .split('')
  .reduce((acc, val, idx) => {
    return `${acc}${shifter(val, idx)}`
  }, '')
}

function checkWinner(codeList, shoppingCart) {
  const [code1, code2] = codeList;
  
}

function getMovieRecomendations(movie, n) {

  const derpy = (movie, storage) => {
    if (storage.length < n) {
      const bestMovie = movie.getSimilarMovies().reduce((acc, val) => {
        if (val.getRating() > acc.getRating()) acc = val;
        return acc;
      });
      if (bestMovie.getSimilarMovies().length) {
        return derpy(bestMovie, storage.push(bestMovie));
      }
    }
    return storage;
  };

  return derpy(movie, []).map(val => val.getId()).join('');
}

module.exports = {
  solve,
  aVeryBigSum,
  matrixSolverUper,
  rowBuilder,
  stairCaseBuilder,
  miniMaxSummer,
  birthdayCakeCandles,
  convertTime,
  dupeDetector,
  super_reduced_string,
  detectCaps,
  gradingStudents,
  caesarShift,
  checkWinner,
  getMovieRecomendations
};
