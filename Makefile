install:
	npm install

publish:
	npm publish

lint:
	npx eslint .

run:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/beforeTree.json __tests__/__fixtures__/afterTree.json

test:
	npm test

watch:
	npx jest --watch

build:
	rm-rf dist
	npm run build
