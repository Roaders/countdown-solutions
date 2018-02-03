
export interface ILetterCounts{
    word: string;
    [propName: string]: any;
}

export function buildLetterCounts(letters: string): ILetterCounts{
    const counts: ILetterCounts = {
        word: letters
    };

    const letterRegexp = /\w/;

    letters.split("")
        .filter(letter => letterRegexp.test(letter))
        .forEach(letter => {
            counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
        });

    return counts;
}

export function testWord(word: ILetterCounts, conundrum: ILetterCounts): boolean{
    
    for(var letter in word){
        if(letter.length === 1 && (conundrum[letter] == undefined || word[letter] > conundrum[letter])){
            return false;
        }
    }
    
    return true;
}

export function compareWordLength(wordOne: string, wordTwo: string): number{
    const lengthComparison = wordOne.length - wordTwo.length;

    if(lengthComparison != 0){
        return lengthComparison
    }

    return wordOne.localeCompare(wordTwo);
}