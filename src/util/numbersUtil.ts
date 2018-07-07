
import { operators, operatee, solution, operationLookup } from "./operators"

export function solve(numbers: number[], target: number){

    console.log(`Finding solution to '${target}' with '${numbers}'`)

    const solutions = generateSolutions(numbers);

    console.log(`${solutions.length} solutions generated`);
}

function generateSolutions(numbers: number[]): solution[] {

    return numbers.reduce<solution[]>((solutions, number, index) => {
        const remainingNumbers = numbers.splice(index, 1);
        solutions.push(...generateSolutionsForSingleNumber(number, remainingNumbers));
        return solutions;
    }, [])
}

function generateSolutionsForSingleNumber(number: number, remainingNumbers: number[]): solution[] {

    const solutions: solution[] = [];

    remainingNumbers.forEach(remainingNumber => solutions.push(...generateSolutionsForAllOperators(number,remainingNumber)));

    return solutions;
}

function generateSolutionsForAllOperators(one: operatee, two: operatee): solution[] {
    return operators
        .filter(operator => operationLookup[operator].canHandle([one, two]))
        .map(operator => ({
            values: [one, two],
            operator: operator,
            result: operationLookup[operator].calculate([one, two]),
        }));
}
