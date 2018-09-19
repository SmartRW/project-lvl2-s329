install:
	npm install

publish:
	npm publish

lint:
	npx eslint .

run:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

test:
	npm test

build:
	rm-rf dist
	npm run build
