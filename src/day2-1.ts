import {data as testData} from './data-test/day2-1';
import {data as prodData} from './data-prod/day2-1';
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

function isPossible(game: Game, parts: Part[]): boolean {
  return parts.every((part) => {
    return game.handfuls.every((handful) => {
      const handfulPart = handful.parts.find((handfulPart) => handfulPart.stone === part.stone);
      return !handfulPart || part.count >= handfulPart.count;
    });
  });
}

function possibleGamesForParts(games: Game[], parts: Part[]): Game[] {
  return games.filter((game) => isPossible(game, parts));
}

function main() {
  const bag = [
    {count: 12, stone: 'red'},
    {count: 13, stone: 'green'},
    {count: 14, stone: 'blue'},
  ] as Part[];

  of(testData)
    .pipe(map(parseData))
    .pipe(map((games) => possibleGamesForParts(games, bag)))
    .pipe(map((games) => games.reduce((acc, game) => acc + game.id, 0)))
    .subscribe((x) => console.log(`Test Answer: ${x}`));

  of(prodData)
    .pipe(map(parseData))
    .pipe(map((games) => possibleGamesForParts(games, bag)))
    .pipe(map((games) => games.reduce((acc, game) => acc + game.id, 0)))
    .subscribe((x) => console.log(`Prod Answer: ${x}`));
}
main();
