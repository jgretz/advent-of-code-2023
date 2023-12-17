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

function parse(data: string): Card[] {
  return data.split('\n').map(parseCardFromLine);
}

function numberOfMatches(card: Card): number {
  return card.cardNumbers.filter((number) => card.winningNumbers.includes(number)).length;
}

function processDeck(deck: Card[]): Card[] {
  const final = deck.reduce((acc, card, index) => {
    acc.push(card);

    const matches = numberOfMatches(card);
    const numberOfCards = acc.filter((x) => x.id === card.id).length;

    for (let i = 0; i < matches; i++) {
      const addCardIndex = index + i + 1;
      if (addCardIndex < deck.length) {
        for (let j = 0; j < numberOfCards; j++) {
          acc.push(deck[addCardIndex]);
        }
      }
    }

    return acc;
  }, []);

  return final;
}

function main() {
  of(testData)
    .pipe(map(parse))
    .pipe(map(processDeck))
    .subscribe((deck) => console.log(deck.length));

  of(prodData)
    .pipe(map(parse))
    .pipe(map(processDeck))
    .subscribe((deck) => console.log(deck.length));
}

main();
