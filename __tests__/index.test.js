import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToResult = '__tests__/__fixtures__/result.txt';
const result = fs.readFileSync(pathToResult, 'utf-8');

test('plain JSON', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON)).toBe(result);
});
