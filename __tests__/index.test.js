import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToResult = '__tests__/__fixtures__/result.txt';
const getResult = path => fs.readFileSync(path, 'utf-8');

const pathToBeforeYAML = '__tests__/__fixtures__/before.yaml';
const pathToAfterYAML = '__tests__/__fixtures__/after.yaml';

const pathToBeforeINI = '__tests__/__fixtures__/before.ini';
const pathToAfterINI = '__tests__/__fixtures__/after.ini';


test('render to tree simple JSON', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON, 'tree')).toBe(getResult(pathToResult));
});

test('render to tree simple YAML', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterYAML, 'tree')).toBe(getResult(pathToResult));
});

test('render to tree simple YAML and JSON', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterJSON, 'tree')).toBe(getResult(pathToResult));
});

test('render to tree simple INI', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterINI, 'tree')).toBe(getResult(pathToResult));
});

test('render to tree simple INI and YAML', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterYAML, 'tree')).toBe(getResult(pathToResult));
});

const pathToResultTree = '__tests__/__fixtures__/resultTree.txt';
const pathToBeforeTreeJSON = '__tests__/__fixtures__/beforeTree.json';
const pathToAfterTreeJSON = '__tests__/__fixtures__/afterTree.json';

test('render to tree JSON', () => {
  expect(genDiff(pathToBeforeTreeJSON, pathToAfterTreeJSON, 'tree')).toBe(getResult(pathToResultTree));
});

const pathToBeforeTreeINI = '__tests__/__fixtures__/beforeTree.ini';
const pathToAfterTreeINI = '__tests__/__fixtures__/afterTree.ini';

test('render to tree INI', () => {
  expect(genDiff(pathToBeforeTreeINI, pathToAfterTreeINI, 'tree')).toBe(getResult(pathToResultTree));
});

const pathToBeforeTreeYAML = '__tests__/__fixtures__/beforeTree.yaml';
const pathToAfterTreeYAML = '__tests__/__fixtures__/afterTree.yaml';

test('render to tree YAML', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeYAML, 'tree')).toBe(getResult(pathToResultTree));
});

test('render to tree YAML and INI', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeINI, 'tree')).toBe(getResult(pathToResultTree));
});

const pathToResultPlain = '__tests__/__fixtures__/resultPlain.txt';

test('render to plain YAML and INI', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeINI, 'plain')).toBe(getResult(pathToResultPlain));
});
