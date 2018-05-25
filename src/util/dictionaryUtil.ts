
import * as fs from "fs";

const maxLength = 12;

type wordGroup = {
    maxLength: number;
    
};

export function createWordLists(path: string){

    const words = fs.readFileSync(path).toString().split("\r\n");

    const maxLength = words.reduce<number>((currentMax,word) => Math.max(currentMax, word.length), 0);


    console.log(`Max length: ${maxLength}`);
}

function addWordToGroups(){

}