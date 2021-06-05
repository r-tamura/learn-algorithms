import test from "ava";
import * as tester from "./primality_test";

test("felmatTest: 2 is prime", (t) => {
  t.is(tester.felmatTest(2, 1), true);
});

test("felmatTest: 4 is not prime", (t) => {
  t.is(tester.felmatTest(4, 1), false);
});

test("felmatTest: 2048 is not prime", (t) => {
  t.is(tester.felmatTest(2048, 1), false);
});

test("felmatTest: 19853 is prime", (t) => {
  t.is(tester.felmatTest(19853, 5), true);
});

test("millerRabin: 2 is prime", (t) => {
  t.is(tester.millerRabinTest(2, 1), true);
});

test("millerRabin: 4 is not prime", (t) => {
  t.is(tester.millerRabinTest(4, 1), false);
});

test("millerRabin: 121 is not prime", (t) => {
  t.is(tester.millerRabinTest(121, 1), false);
});

test("millerRabin: 5111 is not prime", (t) => {
  t.is(tester.millerRabinTest(5111, 1), false);
});

test("millerRabin: 19853 is prime", (t) => {
  t.is(tester.millerRabinTest(19853, 3), true);
});

test("2 is prime", (t) => {
  t.is(tester.isPrime(2), true);
});

test("4 is not prime", (t) => {
  t.is(tester.isPrime(4), false);
});

test("121 is not prime", (t) => {
  t.is(tester.isPrime(121), false);
});

test("5111 is not prime", (t) => {
  t.is(tester.isPrime(5111), false);
});

test("104729 is prime", (t) => {
  t.is(tester.isPrime(104729), true);
});

test("getPrime (defaults less than 10,000)", (t) => {
  const prime = tester.getPrime();
  t.true(prime >= 1);
  t.true(prime <= 1000);
  t.is(tester.isPrime(prime), true);
});

test("getPrime (between 1000 and 3000)", (t) => {
  const prime = tester.getPrime(1000, 3000);
  t.true(prime >= 1000);
  t.true(prime <= 3000);
  t.is(tester.isPrime(prime), true);
});
