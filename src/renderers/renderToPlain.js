import _ from 'lodash';

const render = (ast) => {
  const iter = (data, keyAncestor) => {
    const currentValue = node => (_.isObject(node.value) ? '[complex value]' : node.value);
    const previousValue = node => (_.isObject(node.previousValue) ? '[complex value]' : node.previousValue);
    const nodeCases = {
      ancestor: node => iter(node.children, `${keyAncestor}${node.key}.`),
      added: node => `Property ${keyAncestor}${node.key} was added with value: ${currentValue(node)}`,
      removed: node => `Property ${keyAncestor}${node.key} was removed`,
      changed: node => `Property ${keyAncestor}${node.key} was updated. From ${previousValue(node)} to ${currentValue(node)}`,
    };

    const getCase = node => nodeCases[node.type];
    const buildString = node => getCase(node)(node);
    const arr = data
      .filter(({ type }) => type !== 'unchanged')
      .map(node => buildString(node))
      .join('\n');
    return arr;
  };
  return `${iter(ast, '')}\n`;
};

export default render;
