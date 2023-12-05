import fs from "fs";

const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

// Some test input: total should be 602
/*
const input = [
  "two1nine", // 29
  "eightwothree", // 83
  "abcone2threexyz", // 13
  "xtwone3four", // 24
  "4nineeightseven2", // 42
  "zoneight234", // 14
  "7pqrstsixteen", // 76
  "sevenine", // 79
  "eighthree", // 83
  "five", // 55
  "eightwo", // 82
  "ltpzstwo78fivefourstwox", // 22
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
  const unorderedIndexes = {};

  // Get the indexes of the word numbers
  Object.keys(wordNumbers).forEach(key => {
    const indecies = [...value.matchAll(new RegExp(key, 'gi'))].map(a => a.index);
    if (indecies.length > 0) {
      indecies.forEach((i) => {
        unorderedIndexes[i] = wordNumbers[key];
      });
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

  return result;
});

const sum = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(sum);
