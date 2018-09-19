import fs from 'fs';
import _ from 'lodash';

export default (pathToFirstFile, pathToSecondFile) => {
  const firstFile = JSON.parse(fs.readFileSync(pathToFirstFile));
  const secondFile = JSON.parse(fs.readFileSync(pathToSecondFile));
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
