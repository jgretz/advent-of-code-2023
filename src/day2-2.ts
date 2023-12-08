import {data as testData} from './data-test/day2-2';
import {data as prodData} from './data-prod/day2-2';
import {of, map} from 'rxjs';

type Stone = 'red' | 'green' | 'blue';

interface Part {
  count: number;
  stone: Stone;
}

interface Handful {
  parts: Part[];
}

interface Game {
  id: number;
  handfuls: Handful[];
}

function parseGameId(part: string): number {
  const number = part.match(/Game (\d+)/)[1];
  return parseInt(number);
}

function parsePart(part: string): Part {
  const [count, stone] = part.trim().split(' ');
  return {
    count: parseInt(count),
    stone: stone as Stone,
  };
}

function parseHandful(part: string): Handful {
  return {
    parts: part.split(',').map(parsePart),
  };
}

function parseHandfuls(part: string): Handful[] {
  return part.split(';').map(parseHandful);
}

function parseGameFromLine(line: string): Game {
  const [id, handfuls] = line.split(':');
  return {
    id: parseGameId(id),
    handfuls: parseHandfuls(handfuls),
  };
}

function parseData(data: string): Game[] {
  return data.split('\n').map(parseGameFromLine);
}

function lowestPossibleForGame(game: Game): Part[] {
  return ['red', 'green', 'blue'].map((stone) => {
    const counts = game.handfuls.map((handful) => {
      const part = handful.parts.find((part) => part.stone === stone);

      return part ? part.count : 0;
    });

    return {stone, count: Math.max(...counts)};
  }) as Part[];
}

function powerOfGame(game: Game): number {
  const temp = lowestPossibleForGame(game);
  const power = temp.reduce((acc, part) => acc * part.count, 1);

  return power;
}

function main() {
  of(testData)
    .pipe(map(parseData))
    .pipe(map((games) => games.reduce((acc, game) => acc + powerOfGame(game), 0)))
    .subscribe((x) => console.log(`Test Answer: ${x}`));

  of(prodData)
    .pipe(map(parseData))
    .pipe(map((games) => games.reduce((acc, game) => acc + powerOfGame(game), 0)))
    .subscribe((x) => console.log(`Prod Answer: ${x}`));
}
main();
