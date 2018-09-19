import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const formatAction = [
  {
    format: '.json',
    func: arg => JSON.parse(arg),
  },
  {
    format: '.yaml',
    func: arg => yaml.safeLoad(arg),
  },
  {
    format: '.ini',
    func: arg => ini.parse(arg),
  },
];

const getAction = fileExtension => formatAction
  .find(({ format }) => format === fileExtension).func;

export default (pathToFile) => {
  const obj = fs.readFileSync(pathToFile, 'utf-8');
  const fileFormat = path.extname(pathToFile);
  return getAction(fileFormat)(obj);
};
