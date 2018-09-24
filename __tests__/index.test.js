import fs from 'fs';
import genDiff from '../src';

const pathToBeforeJSON = '__tests__/__fixtures__/before.json';
const pathToAfterJSON = '__tests__/__fixtures__/after.json';
const pathToResult = '__tests__/__fixtures__/result.txt';

const pathToBeforeYAML = '__tests__/__fixtures__/before.yaml';
const pathToAfterYAML = '__tests__/__fixtures__/after.yaml';

const pathToBeforeINI = '__tests__/__fixtures__/before.ini';
const pathToAfterINI = '__tests__/__fixtures__/after.ini';


test('render to tree simple JSON', () => {
  expect(genDiff(pathToBeforeJSON, pathToAfterJSON, 'tree')).toBe(fs.readFileSync(pathToResult, 'utf-8'));
});

test('render to tree simple YAML', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterYAML, 'tree')).toBe(fs.readFileSync(pathToResult, 'utf-8'));
});

test('render to tree simple YAML and JSON', () => {
  expect(genDiff(pathToBeforeYAML, pathToAfterJSON, 'tree')).toBe(fs.readFileSync(pathToResult, 'utf-8'));
});

test('render to tree simple INI', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterINI, 'tree')).toBe(fs.readFileSync(pathToResult, 'utf-8'));
});

test('render to tree simple INI and YAML', () => {
  expect(genDiff(pathToBeforeINI, pathToAfterYAML, 'tree')).toBe(fs.readFileSync(pathToResult, 'utf-8'));
});

const pathToResultTree = '__tests__/__fixtures__/resultTree.txt';
const pathToBeforeTreeJSON = '__tests__/__fixtures__/beforeTree.json';
const pathToAfterTreeJSON = '__tests__/__fixtures__/afterTree.json';

test('render to tree JSON', () => {
  expect(genDiff(pathToBeforeTreeJSON, pathToAfterTreeJSON, 'tree')).toBe(fs.readFileSync(pathToResultTree, 'utf-8'));
});

const pathToBeforeTreeINI = '__tests__/__fixtures__/beforeTree.ini';
const pathToAfterTreeINI = '__tests__/__fixtures__/afterTree.ini';

test('render to tree INI', () => {
  expect(genDiff(pathToBeforeTreeINI, pathToAfterTreeINI, 'tree')).toBe(fs.readFileSync(pathToResultTree, 'utf-8'));
});

const pathToBeforeTreeYAML = '__tests__/__fixtures__/beforeTree.yaml';
const pathToAfterTreeYAML = '__tests__/__fixtures__/afterTree.yaml';

test('render to tree YAML', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeYAML, 'tree')).toBe(fs.readFileSync(pathToResultTree, 'utf-8'));
});

test('render to tree YAML and INI', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeINI, 'tree')).toBe(fs.readFileSync(pathToResultTree, 'utf-8'));
});

const pathToResultPlain = '__tests__/__fixtures__/resultPlain.txt';

test('render to plain YAML and INI', () => {
  expect(genDiff(pathToBeforeTreeYAML, pathToAfterTreeINI, 'plain')).toBe(fs.readFileSync(pathToResultPlain, 'utf-8'));
});
