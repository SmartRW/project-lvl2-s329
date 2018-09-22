import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAST from './ast';
import render from './renderers';

const parse = (pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  return getParser(fileExtension)(fileContent);
};

export default (pathToFirstFile, pathToSecondFile, type = 'tree') => {
  const firstFile = parse(pathToFirstFile);
  const secondFile = parse(pathToSecondFile);
  const ast = buildAST(firstFile, secondFile);
  console.log(ast);
  return render(ast, type);
};
