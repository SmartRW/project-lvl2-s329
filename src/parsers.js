import yaml from 'js-yaml';
import ini from 'ini';

const formatAction = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default fileExtension => formatAction[fileExtension];
