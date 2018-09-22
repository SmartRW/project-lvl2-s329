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

const pathToResultTree = '__tests__/__fixtures__/resultTree.txt';
const pathToBeforeTreeJSON = '__tests__/__fixtures__/beforeTree.json';
const pathToAfterTreeJSON = '__tests__/__fixtures__/afterTree.json';

test('tree JSON', () => {
  expect(genDiff(pathToBeforeTreeJSON, pathToAfterTreeJSON)).toBe(result(pathToResultTree));
});

const pathToBeforeTreeINI = '__tests__/__fixtures__/beforeTree.ini';
const pathToAfterTreeINI = '__tests__/__fixtures__/afterTree.ini';

test('tree INI', () => {
  expect(genDiff(pathToBeforeTreeINI, pathToAfterTreeINI)).toBe(result(pathToResultTree));
});

const pathToBeforeTreeYAML = '__tests__/__fixtures__/beforeTree.yaml';
const pathToAfterTreeYAML = '__tests__/__fixtures__/afterTree.yaml';

test('tree YAML', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeYAML)).toBe(result(pathToResultTree));
});

test('tree YAML and INI', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeINI)).toBe(result(pathToResultTree));
});
