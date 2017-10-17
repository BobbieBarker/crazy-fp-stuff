import test from 'ava';
import td from 'testdouble';

import {
  Box,
  Either,
  Right,
  Left,
  tryCatch,
  Sum,
  All,
  First,
} from './index';

test('Box map applies functor and returns a box', t => {
  const subject = Box('steve').map(str => str.toUpperCase());
  t.is('STEVE', subject.value());
});

test('Box chain applies functor and unboxes the value in the box', t => {
  const subject = Box('steve').chain(str => str.toUpperCase());
  t.is('STEVE', subject);
});

test('Box fold applies functor and retrieves item from the box', t => {
  const subject = Box('steve').fold(str => str.toUpperCase());
  t.is('STEVE', subject);
});

test('Right chain applies functor and returns the value in the box', t => {
  const subject = Right('steve').chain(str => str.toUpperCase());
  t.is('STEVE', subject);
});

test('Right map applies functor and returns a Right containing the result', t => {
  const subject = Right('steve').map(str => str.toUpperCase());
  t.is('STEVE', subject.value());
});

test('Right fold applies 2nd functor to contained value', t => {
  const subject = Right('steve').fold(x => 'error', str => str.toUpperCase());
  t.is('STEVE', subject);
});

test('Left chain does not apply functor and returns a Left containing the original value', t => {
  const subject = Left('steve').chain(str => str.toUpperCase());
  t.is('Left(steve)', subject.inspect());
});

test('Left map does not apply functor and returns a Left containing the original value', t => {
  const subject = Left('steve').map(str => str.toUpperCase());
  t.is('Left(steve)', subject.inspect());
});

test('Left fold applies 1st functor to contained value', t => {
  const subject = Left('steve').fold(x => 'error', str => str.toUpperCase());
  t.is('error', subject);
});


test('Either returns a right when provided a not nil value', t => {
  const subject = Either('steve');
  t.deepEqual(Right('steve').inspect(), subject.inspect());
});

test('Either returns a Left when passed a null or undefined value', t => {
  const subject = Either(null);
  t.deepEqual('Left(null)', subject.inspect());
});


test('tryCatch returns a Right when tried function is sucessful', t => {
  const derp = td.function();
  td.when(derp(10)).thenReturn('steve');
  t.is('Right(steve)', tryCatch(() => derp(10)).inspect());
});

test('tryCatch returns a Left when the tried function throws an error', t => {
  const derp = td.function();
  td.when(derp(10)).thenThrow('big problems');
  t.is('Left(big problems)', tryCatch(() => derp(10)).inspect());
});

test('Sum concats two numbers together', t => {
  const subject = Sum(1).concat(Sum(2));
  t.is('Sum(3)', subject.inspect());
});

test('Sum empty applies the nuetral element', t => {
  const subject = Sum.empty().concat(Sum(1)).concat(Sum(2));
  t.is('Sum(3)', subject.inspect());
});
