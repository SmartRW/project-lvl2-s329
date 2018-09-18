install:
	npm install

publish:
	npm publish

lint:
	npx run eslint .

run:
	npx babel-node -- 'src/bin/gendiff.js'

test:
	npm test

build:
	rm-rf dist
	npm run build
