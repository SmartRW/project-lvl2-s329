import renderToTree from './renderToTree';
import renderToPlain from './renderToPlain';

const renderersTypes = {
  tree: renderToTree,
  plain: renderToPlain,
};

export default (data, type) => renderersTypes[type](data);
