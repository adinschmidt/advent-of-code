const fs = require('fs');

type Index = { i: number; j: number };
type SymbolMatch = { symbol: string } & Index;
type NumberMatch = { number: string } & Index;

function getSymbolsFromLine(line: string, line_index: number): SymbolMatch[] {
    const regex = /[^0-9.]+/g;
    let match;

    const indices: { symbol: string; i: number; j: number }[] = [];

    while ((match = regex.exec(line)) !== null) {
        indices.push({ symbol: match[0], i: line_index, j: match.index });
    }
    return indices;
}

function getNumbersFromLine(line: string, line_index: number): NumberMatch[] {
    const regex = /[0-9]+/g;
    let match;

    const indices: { number: string; i: number; j: number }[] = [];

    while ((match = regex.exec(line)) !== null) {
        indices.push({ number: match[0], i: line_index, j: match.index });
    }
    return indices;
}

function isAdjacent(coord1: Index, coord2: Index) {
    return (
        Math.abs(coord1.i - coord2.i) <= 1 &&
        Math.abs(coord1.j - coord2.j) <= 1 &&
        !(coord1.i === coord2.i && coord1.j === coord2.j)
    );
}

function isAdjacentNumber(num: NumberMatch, sym: SymbolMatch) {
    for (let i = 0; i < num.number.length; i++) {
        if (isAdjacent({ i: num.i, j: num.j + i }, sym)) {
            return true;
        }
    }
    return false;
}

function solution1(input): number {
    const lines = input
        .split('\n')
        .filter((x) => x !== '')
        .map((x) => x.trim());
    const height = lines.length;
    let sum = 0;

    lines.forEach((line, i) => {
        const numbers = getNumbersFromLine(line, i);
        const symbols_above = i > 0 ? getSymbolsFromLine(lines[i - 1], i - 1) : [];
        const symbols_in_line = getSymbolsFromLine(line, i);
        const symbols_below = i + 1 < height ? getSymbolsFromLine(lines[i + 1], i + 1) : [];
        for (const number of numbers) {
            let found = false;
            if (symbols_above.some((symbol) => isAdjacentNumber(number, symbol))) {
                sum += parseInt(number.number);
                found = true;
            }
            if (!found && symbols_in_line.some((symbol) => isAdjacentNumber(number, symbol))) {
                sum += parseInt(number.number);
                found = true;
            }
            if (!found && symbols_below.some((symbol) => isAdjacentNumber(number, symbol))) {
                sum += parseInt(number.number);
                found = true;
            }
        }
    });
    return sum;
}

function solution2(input): number {
    const lines = input
        .split('\n')
        .filter((x) => x !== '')
        .map((x) => x.trim());
    const height = lines.length;
    let sum = 0;

    lines.forEach((line, i) => {
        const gears = getSymbolsFromLine(line, i).filter((symbol) => symbol.symbol === '*');
        const numbers_above = i > 0 ? getNumbersFromLine(lines[i - 1], i - 1) : [];
        const numbers_in_line = getNumbersFromLine(line, i);
        const numbers_below = i + 1 < height ? getNumbersFromLine(lines[i + 1], i + 1) : [];

        gears.forEach((gear) => {
            const adjacent = numbers_above
                .filter((number) => isAdjacentNumber(number, gear))
                .map((number) => parseInt(number.number))
                .concat(
                    numbers_in_line
                        .filter((number) => isAdjacentNumber(number, gear))
                        .map((number) => parseInt(number.number)),
                )
                .concat(
                    numbers_below
                        .filter((number) => isAdjacentNumber(number, gear))
                        .map((number) => parseInt(number.number)),
                );
            if (adjacent.length === 2) {
                sum += adjacent.reduce((a, b) => a * b);
            }
        });
    });
    return sum;
}

const fileName = process.argv[2];
const input = fs.readFileSync(fileName, 'utf8');

console.log(solution1(input));
console.log(solution2(input));
