import _ from 'lodash';

const singleIndentSpacesCount = 2;

const render = (ast) => {
  const iter = (tree, treeLevel = 0) => {
    const indentBeforeNodeValue = ' '.repeat(singleIndentSpacesCount + treeLevel * singleIndentSpacesCount * 2);
    const indentBeforeEndBrace = ' '.repeat(treeLevel * singleIndentSpacesCount * 2);
    const indentBeforeObject = treeLevel === 0
      ? ' '.repeat(singleIndentSpacesCount * 3)
      : indentBeforeNodeValue;

    const result = tree.map((element) => {
      const objectToString = (obj) => {
        const keys = Object.keys(obj);
        return keys
          .map(key => (_.isObject(obj[key]) ? objectToString(obj[key]) : `${indentBeforeObject}${key}: ${obj[key]}`))
          .join('\n');
      };

      const stringify = (value) => {
        const objectCase = `{\n${indentBeforeNodeValue}${objectToString(value)}\n  ${indentBeforeNodeValue}}`;
        const primitiveCase = `${value}`;
        return _.isObject(value) ? objectCase : primitiveCase;
      };

      const nodeCases = {
        ancestor: node => `${indentBeforeNodeValue}  ${node.key}: ${iter(node.children, treeLevel + 1)}`,
        added: node => `${indentBeforeNodeValue}+ ${node.key}: ${stringify(node.value)}`,
        removed: node => `${indentBeforeNodeValue}- ${node.key}: ${stringify(node.value)}`,
        changed: node => `${indentBeforeNodeValue}+ ${node.key}: ${stringify(node.value)}\n${indentBeforeNodeValue}- ${node.key}: ${stringify(node.previousValue)}`,
        unchanged: node => `${indentBeforeNodeValue}  ${node.key}: ${stringify(node.value)}`,
      };

      const getCase = node => nodeCases[node.type];
      return getCase(element)(element);
    });
    return ['{', ...result, `${indentBeforeEndBrace}}`].join('\n');
  };
  return `${iter(ast)}\n`;
};

export default render;
