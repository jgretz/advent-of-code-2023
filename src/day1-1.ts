import {data as testData} from './data-test/day1-1';
import {data as prodData} from './data-prod/day1-1';
import {of, map} from 'rxjs';

function parseData(data: string): string[] {
  return data.split('\n');
}

function numberForString(data: string): number {
  const numbers = data.match(/\d/g);
  if (!numbers || numbers.length === 0) {
    return 0;
  }

  return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

function lineTotal(data: string[]): number {
  return data.reduce((acc, line) => {
    const num = numberForString(line);

    console.log(num);

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
