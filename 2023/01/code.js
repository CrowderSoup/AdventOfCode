const fs = require("fs");

const rawInput = fs.readFileSync("./input.txt").toString();
const input = rawInput.split("\n");

// Some test input
/*
const input = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
  "sevenine",
  "eighthree",
  "five",
  "eightwo"
];
*/


const wordNumbers = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

const numbers = input.map((value) => {
  if (!value) {
    return 0;
  }

  const unorderedIndexes = {};

  // Get the indexes of the word numbers
  Object.keys(wordNumbers).forEach(key => {
    const index = value.indexOf(key);

    if (index >= 0) {
      unorderedIndexes[index] = wordNumbers[key];
    }
  });

  // Get the indexes of digits
  value.split("").forEach((v, i) => {
    const n = parseInt(v);

    if (n) {
      unorderedIndexes[i] = n;
    }
  });

  const sortedIndexes = Object.keys(unorderedIndexes).sort().reduce((obj, key) => {
    obj[key] = unorderedIndexes[key];
    return obj;
  }, {});

  const firstNum = Object.values(sortedIndexes)[0];
  const lastNum = Object.values(sortedIndexes)[Object.keys(sortedIndexes).length - 1];

  const result = parseInt(`${firstNum}${lastNum}`);

  if (!result) {
    return 0;
  }

  return result;
});

const sum = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(sum);
