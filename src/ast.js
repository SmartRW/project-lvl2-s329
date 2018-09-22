import _ from 'lodash';

const buildAST = (firstData, secondData) => {
  const firstDataKeys = Object.keys(firstData);
  const secondDataKeys = Object.keys(secondData);
  const unitedKeys = _.union(firstDataKeys, secondDataKeys);
  const ast = unitedKeys.map((key) => {
    const firstDataValue = firstData[key];
    const secondDataValue = secondData[key];
    if (_.isObject(firstDataValue) && _.isObject(secondDataValue)) {
      return {
        key,
        type: 'ancestor',
        children: buildAST(firstDataValue, secondDataValue),
      };
    }
    if (!_.has(firstData, key)) {
      return {
        key,
        type: 'added',
        value: secondDataValue,
      };
    }
    if (!_.has(secondData, key)) {
      return {
        key,
        type: 'removed',
        value: firstDataValue,
      };
    }
    if (firstDataValue !== secondDataValue) {
      return {
        key,
        type: 'changed',
        previousValue: firstDataValue,
        currentValue: secondDataValue,
      };
    }
    return {
      key,
      type: 'unchanged',
      value: firstDataValue,
    };
  });
  return ast;
};

export default buildAST;
