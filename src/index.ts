#! /usr/bin/env node

import * as fs from "fs";
import * as path from "path";

import { buildLetterCounts, testWord, compareWordLength } from "./util/wordUtil"
import { solve } from "./util/numbersUtil";

const conundrum = process.argv[2];

const numbersRegExp = /[\d,]/
const targetRegExp = /[\d]/

if(numbersRegExp.test(process.argv[2]) && targetRegExp.test(process.argv[3])){
    const numbers = process.argv[2].split(",")
        .map(number => parseInt(number));
    const target = parseInt(process.argv[3]);

    solve(numbers, target );
    
    process.exit();
}

if (conundrum == null) {
    console.log(`No conundrum supplied, exiting`);
    process.exit();
}

let words: string[];

if(process.argv.length > 3){
    words = process.argv.splice(3);
    console.log(`Words: ${words}`)
}
else {
    const wordsPath = path.join(__dirname, "../", "dictionary", "words.txt");
    
    words = fs.readFileSync(wordsPath).toString().split("\r\n");
}

console.log(`Searching for solutions to: '${conundrum}'...`);

const conundrumCounts = buildLetterCounts(conundrum.toLowerCase());

const searchStart = Date.now();

const results = words
    .map(word => buildLetterCounts(word))
    .filter(counts => testWord(counts, conundrumCounts))
    .map(counts => counts.word);

results
    .filter(word => word.length > 3)
    .sort(compareWordLength)
    .forEach(word => console.log(`${word} (${word.length})`))

console.log(`${results.length} results found in ${Date.now() - searchStart}ms`);