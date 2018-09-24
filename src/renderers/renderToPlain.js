import _ from 'lodash';

const buildValueString = node => (_.isObject(node) ? '[complex value]' : node);

const render = (ast) => {
  const iter = (data, keyAncestor) => {
    const nodeCases = {
      ancestor: node => iter(node.children, `${keyAncestor}${node.key}.`),
      added: node => `Property ${keyAncestor}${node.key} was added with value: ${buildValueString(node.value)}`,
      removed: node => `Property ${keyAncestor}${node.key} was removed`,
      changed: node => `Property ${keyAncestor}${node.key} was updated. From ${buildValueString(node.previousValue)} to ${buildValueString(node.value)}`,
    };

    const getCase = node => nodeCases[node.type];
    const buildString = node => getCase(node)(node);
    const arr = data
      .filter(({ type }) => type !== 'unchanged')
      .map(node => buildString(node))
      .join('\n');
    return arr;
  };
  return iter(ast, '');
};

export default render;
