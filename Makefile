
all: lint test test-browser

test:
	@./node_modules/.bin/mocha \
		--reporter spec

test-browser: component
	@echo 'Running browser tests'
	@./node_modules/.bin/mocha-phantomjs \
		--path ./node_modules/.bin/phantomjs \
		test/index.html

lint:
	@./node_modules/.bin/jshint \
		--verbose \
		*.js \
		test/*.js

component: component.json index.js
	@./node_modules/.bin/component-install --dev
	@./node_modules/.bin/component-build

.PHONY: test test-browser lint
