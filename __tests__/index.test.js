import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToResult = '__tests__/__fixtures__/result.txt';
const result = path => fs.readFileSync(path, 'utf-8');

const pathToBeforeYAML = '__tests__/__fixtures__/before.yaml';
const pathToAfterYAML = '__tests__/__fixtures__/after.yaml';

const pathToBeforeINI = '__tests__/__fixtures__/before.ini';
const pathToAfterINI = '__tests__/__fixtures__/after.ini';

test('plain JSON', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON)).toBe(result(pathToResult));
});

test('plain YAML', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterYAML)).toBe(result(pathToResult));
});

test('plain YAML and JSON', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterJSON)).toBe(result(pathToResult));
});

test('plain INI', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterINI)).toBe(result(pathToResult));
});

test('plain INI and YAML', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterYAML)).toBe(result(pathToResult));
});
