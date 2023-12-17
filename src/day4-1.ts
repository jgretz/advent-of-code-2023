import {data as testData} from './data-test/day4-1';
import {data as prodData} from './data-prod/day4-1';
import {of, map} from 'rxjs';

interface Card {
  id: number;
  winningNumbers: number[];
  cardNumbers: number[];
}

function parseGameId(part: string): number {
  const number = part.match(/Card\s+(\d+)/)[1];
  return parseInt(number);
}

function parseCardNumbers(part: string): number[] {
  return part
    .split(' ')
    .map((x) => x.trim())
    .filter((x) => x)
    .map((number) => parseInt(number, 10));
}

function parseCardFromLine(line: string): Card {
  const [id, numbers] = line.split(':');
  const [winningNumbers, cardNumbers] = numbers.split('|');

  return {
    id: parseGameId(id),
    winningNumbers: parseCardNumbers(winningNumbers),
    cardNumbers: parseCardNumbers(cardNumbers),
  };
}

function cardValue(card: Card): number {
  return card.cardNumbers.reduce((acc, number) => {
    if (!card.winningNumbers.includes(number)) {
      return acc;
    }

    return acc ? acc * 2 : 1;
  }, 0);
}

function parse(data: string): Card[] {
  return data.split('\n').map(parseCardFromLine);
}

function sum(values: number[]): number {
  return values.reduce((acc, value) => acc + value, 0);
}

function main() {
  of(testData)
    .pipe(map(parse))
    .pipe(map((cards) => cards.map(cardValue)))
    .pipe(map(sum))
    .subscribe(console.log);

  of(prodData)
    .pipe(map(parse))
    .pipe(map((cards) => cards.map(cardValue)))
    .pipe(map(sum))
    .subscribe(console.log);
}

main();
