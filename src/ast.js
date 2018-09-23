import _ from 'lodash';

const nodeActions = [
  {
    check: (...rest) => {
      const [,, value1, value2] = rest;
      return _.isObject(value1) && _.isObject(value2);
    },
    action: (key, value1, value2, func) => ({
      key,
      type: 'ancestor',
      children: func(value1, value2),
    }),
  },
  {
    check: (...rest) => {
      const [data1,,,, key] = rest;
      return !_.has(data1, key);
    },
    action: (key, value1, value2) => ({
      key,
      type: 'added',
      value: value2,
    }),
  },
  {
    check: (...rest) => {
      const [, data2,,, key] = rest;
      return !_.has(data2, key);
    },
    action: (key, value1) => ({
      key,
      type: 'removed',
      value: value1,
    }),
  },
  {
    check: (...rest) => {
      const [,, value1, value2] = rest;
      return value1 !== value2;
    },
    action: (key, value1, value2) => ({
      key,
      type: 'changed',
      previousValue: value1,
      value: value2,
    }),
  },
  {
    check: (...rest) => {
      const [,, value1, value2] = rest;
      return value1 === value2;
    },
    action: (key, value1) => ({
      key,
      type: 'unchanged',
      value: value1,
    }),
  },
];

const buildAST = (firstData, secondData) => {
  const firstDataKeys = Object.keys(firstData);
  const secondDataKeys = Object.keys(secondData);
  const unitedKeys = _.union(firstDataKeys, secondDataKeys);

  const ast = unitedKeys.map((key) => {
    const firstDataValue = firstData[key];
    const secondDataValue = secondData[key];
    const getAction = nodeActions
      .find(({ check }) => check(firstData, secondData, firstDataValue, secondDataValue, key));
    return getAction.action(key, firstDataValue, secondDataValue, buildAST);
  });
  return ast;
};

export default buildAST;
