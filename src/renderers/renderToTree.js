import _ from 'lodash';

const singleIndentCount = 4;

const render = (ast, treeLevel = 0) => {
  const indentBeforeUnchanged = ' '.repeat(treeLevel * singleIndentCount + singleIndentCount);
  const indentBeforeChanged = ' '.repeat(treeLevel * singleIndentCount + singleIndentCount / 2);
  const indentBeforeObject = ' '.repeat((treeLevel + 1) * singleIndentCount + singleIndentCount);
  const stringify = (data) => {
    const makeStringFromObject = (obj) => {
      const objString = Object.keys(obj)
        .map(key => `${indentBeforeObject}${key}: ${stringify(obj[key])}`)
        .join('\n');
      return `{\n${objString}\n${indentBeforeUnchanged}}`;
    };
    return _.isObject(data) ? makeStringFromObject(data) : `${data}`;
  };

  const nodeCases = {
    ancestor: node => `${indentBeforeUnchanged}${node.key}: {\n${render(node.children, treeLevel + 1)}\n${indentBeforeUnchanged}}`,
    added: node => `${indentBeforeChanged}+ ${node.key}: ${stringify(node.value)}`,
    removed: node => `${indentBeforeChanged}- ${node.key}: ${stringify(node.value)}`,
    changed: node => [`${indentBeforeChanged}+ ${node.key}: ${stringify(node.value)}`,
      `${indentBeforeChanged}- ${node.key}: ${stringify(node.previousValue)}`],
    unchanged: node => `${indentBeforeUnchanged}${node.key}: ${stringify(node.value)}`,
  };

  const getCase = node => nodeCases[node.type];
  const result = _.flatten(ast.map(node => getCase(node)(node)));

  return result.join('\n');
};

const beautify = ast => `{\n${render(ast)}\n}\n`;

export default beautify;
