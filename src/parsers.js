import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const formatAction = [
  {
    format: '.json',
    func: arg => JSON.parse(arg),
  },
  {
    format: '.yaml',
    func: arg => yaml.safeLoad(arg),
  },
];

const getAction = fileExtension => formatAction
  .find(({ format }) => format === fileExtension).func;

export default (pathToFile) => {
  const obj = fs.readFileSync(pathToFile);
  const fileFormat = path.extname(pathToFile);
  return getAction(fileFormat)(obj);
};
