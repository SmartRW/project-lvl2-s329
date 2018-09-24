import _ from 'lodash';

const singleIndentSpaceCount = 4;

const render = (ast, treeLevel = 0) => {
  const largeIndent = ' '.repeat(treeLevel * singleIndentSpaceCount + singleIndentSpaceCount);
  const smallIndent = ' '.repeat(treeLevel * singleIndentSpaceCount + singleIndentSpaceCount / 2);
  const braceIndent = ' '.repeat(treeLevel * singleIndentSpaceCount);
  const indentBeforeObjectString = ' '.repeat((treeLevel + 1) * singleIndentSpaceCount + singleIndentSpaceCount);
  const stringify = (data) => {
    const makeStringFromObject = (obj) => {
      const objString = Object.keys(obj)
        .map(key => `${indentBeforeObjectString}${key}: ${stringify(obj[key])}`)
        .join('\n');
      return `{\n${objString}\n${largeIndent}}`;
    };
    return _.isObject(data) ? makeStringFromObject(data) : `${data}`;
  };

  const nodeCases = {
    ancestor: node => `${largeIndent}${node.key}: ${render(node.children, treeLevel + 1)}`,
    added: node => `${smallIndent}+ ${node.key}: ${stringify(node.value)}`,
    removed: node => `${smallIndent}- ${node.key}: ${stringify(node.value)}`,
    changed: node => [`${smallIndent}+ ${node.key}: ${stringify(node.value)}`,
      `${smallIndent}- ${node.key}: ${stringify(node.previousValue)}`],
    unchanged: node => `${largeIndent}${node.key}: ${stringify(node.value)}`,
  };

  const getCase = node => nodeCases[node.type];
  const buildStringFromNode = node => getCase(node)(node);
  const result = _.flatten(ast.map(buildStringFromNode)).join('\n');
  return `{\n${result}\n${braceIndent}}`;
};

export default render;
