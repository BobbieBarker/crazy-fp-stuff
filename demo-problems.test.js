import test from 'ava';
import td from 'testdouble';

import {
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
  checkWinner
} from './demo-problems';

test('compares some shit', t => {
  const subject = solve(5, 6, 7, 3, 6, 10);
  t.deepEqual([1, 1], subject);
})

test('computes a ton of shit', t => {
  const subject = aVeryBigSum(5, [1000000001, 1000000002, 1000000003, 1000000004, 1000000005]);
  t.deepEqual(5000000015, subject);
});

test('does some dumbshit with a matrix', t => {
  const a0 = [11, 2, 4];
  const a1 = [4, 5, 6];
  const a2 = [10, 8, -12];

  const subject = matrixSolverUper(3, [a0, a1, a2]);

  t.deepEqual(15, subject);
});

test('it builds a row for a stair case problem', t => {
  const subject = rowBuilder(1, 5);
  t.deepEqual(`    #`, subject);
});

test('it builds a staircase', t => {
  const subject = stairCaseBuilder(6);
  const expected = `     #
    ##
   ###
  ####
 #####
######`;
  t.deepEqual(expected, subject);
});

test('does hokey shit to sum an array', t => {
  const subject = miniMaxSummer([1, 2, 3, 4, 5]);
  t.deepEqual(`10 14`, subject);
});

test('does some birthday candle shit', t => {
  const subject = birthdayCakeCandles(4, [3, 2, 1, 3]);
  t.deepEqual(2, subject);
});

test('converts 12 hr time into military time', t => {
  const subject = convertTime('07:05:45PM');
  t.deepEqual('19:05:45', subject);
});

test('finds number of duplicated a chars in an infinite string', t => {
  const subject = dupeDetector('aba', 10);
  t.deepEqual(7, subject);
});

test('dedupes a string with some shit logic', t => {
  const subject = super_reduced_string('aaabccddd');
  t.deepEqual('abd', subject)
});

test('dedupes a string with some shit logic input #2', t => {
  const subject = super_reduced_string('baab');
  t.deepEqual('Empty String', subject)
});

test('dedupes a string with some shit logic input #3', t => {
  const subject = super_reduced_string('aa');
  t.deepEqual('Empty String', subject)
});

test('detets caps for camel case bullshit', t => {
  const subject = detectCaps('saveChangesInTheEditor');
  t.deepEqual(5, subject);
});

test('auto grades these damn tests', t => {
  const subject = gradingStudents([73, 67, 38, 33]);
  t.deepEqual([75, 67, 40, 33], subject)
});

test('does some ridiculous shit', t => {
  const subject = caesarShift('Attack at dawn!', 12);
  t.deepEqual('Mffmow mf pmiz!', subject);
});

test('it gets me a job at amazon case 1', t => {
  const cart = ['orange', 'apple', 'apple', 'banana', 'orange', 'banana'];
  const subject = checkWinner([['apple', 'apple'], ['banana', 'anything', 'banana']], cart);
  t.deepEqual(1, subject);
});


test.only('it gets me a job at amazon case 2', t => {
  const cart = ['banana', 'orange', 'banana', 'apple', 'apple'];
  const subject = checkWinner([['apple', 'apple'], ['banana', 'anything', 'banana']], cart);
  t.deepEqual(0, subject);
})