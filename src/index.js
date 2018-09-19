import _ from 'lodash';
import parse from './parsers';

export default (pathToFirstFile, pathToSecondFile) => {
  const firstFile = parse(pathToFirstFile);
  const secondFile = parse(pathToSecondFile);
  const keys1 = Object.keys(firstFile);
  const keys2 = Object.keys(secondFile);
  const compared = _.union(keys1, keys2)
    .reduce((acc, key) => {
      if (_.has(firstFile, key) && _.has(secondFile, key)) {
        return firstFile[key] === secondFile[key]
          ? [...acc, `  ${key}: ${firstFile[key]}`]
          : [...acc, `+ ${key}: ${secondFile[key]}`, `- ${key}: ${firstFile[key]}`];
      }
      if (_.has(firstFile, key)) {
        return [...acc, `- ${key}: ${firstFile[key]}`];
      }
      return [...acc, `+ ${key}: ${secondFile[key]}`];
    }, [])
    .map(str => `  ${str}`);
  const result = ['{', ...compared, '}\n'].join('\n');
  console.log(result);
  return result;
};
