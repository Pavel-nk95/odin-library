install:
	npm install

lint:
	npx stylelint ./src/scss/*.scss
	npx htmlhint ./src/*.html

sass:
	npm run sass
