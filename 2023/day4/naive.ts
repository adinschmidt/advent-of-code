import fs from 'fs';

const test = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

function solution1(input: string): number {
    let sum = 0;

    const lines = input
        .split('\n')
        .filter((x) => x !== '')
        .map((x) => x.trim());

    lines.forEach((line, i) => {
        const winning = line
            .split(':')[1]
            .split('|')[0]
            .trim()
            .split(' ')
            .filter((x) => x !== '');
        const have = line
            .split(':')[1]
            .split('|')[1]
            .trim()
            .split(' ')
            .filter((x) => x !== '');

        const intersect = winning.filter((x) => have.includes(x));
        if (intersect.length > 0) sum += 1 * 2 ** (intersect.length - 1);
    });

    return sum;
}

function solution2(input: string): number {
    let sum = 0;

    const lines = input
        .split('\n')
        .filter((x) => x !== '')
        .map((x) => x.trim());

    let cardDict = {};
    for (const card in lines) {
        cardDict[card] = 1;
    }

    lines.forEach((line, i) => {
        const winning = line
            .split(':')[1]
            .split('|')[0]
            .trim()
            .split(' ')
            .filter((x) => x !== '');
        const have = line
            .split(':')[1]
            .split('|')[1]
            .trim()
            .split(' ')
            .filter((x) => x !== '');

        const intersect = winning.filter((x) => have.includes(x));
        for (let j = i; j < intersect.length + i && j + 1 < lines.length; j++) {
            cardDict[j + 1] += cardDict[i];
        }
    });
    sum = Object.values(cardDict).reduce((a, b) => a + b, 0);
    return sum;
}

const fileName = process.argv[2];
const input = fs.readFileSync(fileName, 'utf8');

console.log(solution1(input));
console.log(solution2(input));
