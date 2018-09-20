import yaml from 'js-yaml';
import ini from 'ini';

const formatAction = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default (str, fileExtension) => formatAction[fileExtension](str);
