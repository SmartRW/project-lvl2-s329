import renderToTree from './renderToTree';
import renderToPlain from './renderToPlain';
import renderToJSON from './renderToJSON';

const renderersTypes = {
  tree: renderToTree,
  plain: renderToPlain,
  json: renderToJSON,
};

export default (data, type) => renderersTypes[type](data);
