import {data as testData} from './data-test/day1-2';
import {data as prodData} from './data-prod/day1-2';
import {of, map} from 'rxjs';

function parseData(data: string): string[] {
  return data.split('\n');
}

const searchTerms = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const searchNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function indexOfTerm(term: string): number {
  return searchTerms.indexOf(term);
}

function numberForString(data: string): number {
  const textNumbersFound = searchTerms.reduce((acc, num) => {
    let index = data.indexOf(num);
    while (index !== -1) {
      acc[index] = indexOfTerm(num);
      index = data.indexOf(num, index + 1);
    }

    return acc;
  }, []);

  const numbersFound = searchNumbers.reduce((acc, num) => {
    let index = data.indexOf(num.toString());
    while (index !== -1) {
      acc[index] = num;
      index = data.indexOf(num.toString(), index + 1);
    }

    return acc;
  }, textNumbersFound);

  if (numbersFound.length === 0) {
    return 0;
  }

  const clean = numbersFound.filter((x) => x !== undefined);

  return parseInt(`${clean[0]}${clean[clean.length - 1]}`);
}

function lineTotal(data: string[]): number {
  return data.reduce((acc, line) => {
    const num = numberForString(line);

    return acc + num;
  }, 0);
}

function main() {
  of(testData)
    .pipe(map(parseData))
    .pipe(map(lineTotal))
    .subscribe((x) => console.log(`Test Answer: ${x}`));

  of(prodData)
    .pipe(map(parseData))
    .pipe(map(lineTotal))
    .subscribe((x) => console.log(`Prod Answer: ${x}`));
}

main();
