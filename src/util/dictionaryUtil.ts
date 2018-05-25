
import * as fs from "fs";

const maxLength = 12;
const minLength = 3;

type wordGroup = {
    length: number;
    words: string[];
};

export function createWordLists(path: string){

    const words = fs.readFileSync(path).toString().split(/\r?\n/);

    console.log(`Words: ${words.length}`);

    const groups = words.reduce<wordGroup[]>((groups,word) => addWordToGroups(word, groups), []);

    console.log(`Groups: ${groups.map(g => g.length + ":" + g.words.length).join(", ")}`);
}

function addWordToGroups(word: string, groups: wordGroup[]){
    if(word.length > maxLength || word.length < minLength){
        return groups;
    }

    let group: wordGroup = groups.filter(g => g.length === word.length)[0];
    if(group == null){
        group = {
            length: word.length,
            words: []
        }

        groups.push(group);
    }

    group.words.push(word);

    return groups;
}