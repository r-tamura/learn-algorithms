import { expect, it } from "vitest";
import * as tester from "./primality_test";

it("felmatTest: 2 is prime", () => {
  expect(tester.felmatTest(2, 1)).toBe(true);
});

it("felmatTest: 4 is not prime", () => {
  expect(tester.felmatTest(4, 1)).toBe(false);
});

it("felmatTest: 2048 is not prime", () => {
  expect(tester.felmatTest(2048, 1)).toBe(false);
});

it("felmatTest: 19853 is prime", () => {
  expect(tester.felmatTest(19853, 5)).toBe(true);
});

it("millerRabin: 2 is prime", () => {
  expect(tester.millerRabinTest(2, 1)).toBe(true);
});

it("millerRabin: 4 is not prime", () => {
  expect(tester.millerRabinTest(4, 1)).toBe(false);
});

it("millerRabin: 121 is not prime", () => {
  expect(tester.millerRabinTest(121, 1)).toBe(false);
});

it("millerRabin: 5111 is not prime", () => {
  expect(tester.millerRabinTest(5111, 1)).toBe(false);
});

it("millerRabin: 19853 is prime", () => {
  expect(tester.millerRabinTest(19853, 3)).toBe(true);
});

it("2 is prime", () => {
  expect(tester.isPrime(2)).toBe(true);
});

it("4 is not prime", () => {
  expect(tester.isPrime(4)).toBe(false);
});

it("121 is not prime", () => {
  expect(tester.isPrime(121)).toBe(false);
});

it("5111 is not prime", () => {
  expect(tester.isPrime(5111)).toBe(false);
});

it("104729 is prime", () => {
  expect(tester.isPrime(104729)).toBe(true);
});

it("getPrime (defaults less than 10,000)", () => {
  const prime = tester.getPrime();
  expect(prime >= 1).toBe(true);
  expect(prime <= 1000).toBe(true);
  expect(tester.isPrime(prime)).toBe(true);
});

it("getPrime (between 1000 and 3000)", () => {
  const prime = tester.getPrime(1000, 3000);
  expect(prime >= 1000).toBe(true);
  expect(prime <= 3000).toBe(true);
  expect(tester.isPrime(prime)).toBe(true);
});
