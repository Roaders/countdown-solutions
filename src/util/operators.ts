
const add: IOperator = {
    canHandle: values => values.map(toResult).every(result => result >= 0),
    calculate: values => values.map(toResult).reduce((sum, current) => sum + current, 0)
}

const subtract: IOperator = {
    canHandle: values => {
        const mappedValues = values.map(toResult);
        return mappedValues.length === 2 && mappedValues[1] >= mappedValues[0];
    },
    calculate: values => {
        const mappedValues = values.map(toResult);
        return mappedValues[0] - mappedValues[1];
    }
}

const reverseSubtract: IOperator = {
    canHandle: values => subtract.canHandle([values[1], values[0]]),
    calculate: values => subtract.calculate([values[1], values[0]])
}

const multiply: IOperator = {
    canHandle: () => true,
    calculate: values => values.map(toResult).reduce((product, current) => product * current, 0)
}

const divide: IOperator = {
    canHandle: values => {
        const mappedValues = values.map(toResult);
        return mappedValues.length === 2 && mappedValues[1] != 0 && mappedValues[0] % mappedValues[1] == 0;
    },
    calculate: values => {
        const mappedValues = values.map(toResult);
        return mappedValues[0] / mappedValues[1];
    }
}

const reverseDivide: IOperator = {
    canHandle: values => divide.canHandle([values[1], values[0]]),
    calculate: values => divide.calculate([values[1], values[0]])
}

interface IOperatorLookup {
    "+": IOperator,
    "-": IOperator,
    "_": IOperator,
    "*": IOperator,
    "/": IOperator,
    "\\": IOperator
}

export interface solution{
    values: operatee[];
    operator: operator;
    result: number;
}

export type operatee = solution | number;

export interface IOperator {
    canHandle: (values: operatee[]) => boolean;
    calculate: (values: operatee[]) => number;
}

export const operationLookup: IOperatorLookup = {
    "+": add,
    "-": subtract,
    "_": reverseSubtract,
    "*": multiply,
    "/": divide,
    "\\": reverseDivide
}

export type operator = keyof IOperatorLookup;
export const operators: operator[] = ["+", "-", "_", "*", "/", "\\"];

function toResult(value: operatee): number{
    return typeof value === "number" ? value : value.result;
}