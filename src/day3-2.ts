import {data as testData} from './data-test/day3-1';
import {data as prodData} from './data-prod/day3-1';
import {of, map} from 'rxjs';

interface Point {
  x: number;
  y: number;
}

interface Part {
  id: number;
  start: Point;
  end: Point;
}

interface Sign {
  id: string;
  location: Point;
}

interface World {
  parts: Part[];
  signs: Sign[];
}

function parseLine(world: World, line: string[], y: number) {
  let token = '';
  let tokenStart = -1;

  const storePart = (tokenStart: number) => {
    world.parts.push({
      id: parseInt(token, 10),
      start: {x: tokenStart, y},
      end: {x: tokenStart + token.length - 1, y},
    });

    token = '';
    tokenStart = -1;
  };

  line.forEach((char, x) => {
    if (char === '.') {
      if (token.length > 0) {
        storePart(tokenStart);
      }
      return;
    }

    if (!isNaN(parseInt(char, 10))) {
      token += char;

      if (token.length === 1) {
        tokenStart = x;
      }

      if (x === line.length - 1) {
        storePart(tokenStart);
      }
      return;
    }

    if (token.length > 0) {
      storePart(tokenStart);
    }

    world.signs.push({
      id: char,
      location: {x, y},
    });
  });
}

function parse(data: string): World {
  const world = {
    parts: [],
    signs: [],
  };

  const map = data.split('\n').map((line) => line.split(''));
  map.forEach((line, y) => {
    parseLine(world, line, y);
  });

  return world;
}

function findGears(world: World): Sign[] {
  return world.signs.filter(
    (sign) => sign.id === '*' && partsTouchingSign(world, sign).length === 2,
  );
}

function partsTouchingSign(world: World, sign: Sign) {
  return world.parts.filter((part) => doesSignTouchPart(sign, part));
}

function doesSignTouchPart(sign: Sign, part: Part): boolean {
  const isValid =
    sign.location.x >= part.start.x - 1 &&
    sign.location.x <= part.end.x + 1 &&
    sign.location.y >= part.start.y - 1 &&
    sign.location.y <= part.start.y + 1;

  return isValid;
}

function ratioForGear(world: World, gear: Sign): number {
  return partsTouchingSign(world, gear).reduce((acc, part) => {
    return acc * part.id;
  }, 1);
}

function sumOfGears(world: World): number {
  return findGears(world).reduce((acc, gear) => {
    return acc + ratioForGear(world, gear);
  }, 0);
}

function main() {
  of(testData).pipe(map(parse)).pipe(map(sumOfGears)).subscribe(console.log);
  of(prodData).pipe(map(parse)).pipe(map(sumOfGears)).subscribe(console.log);
}

main();
