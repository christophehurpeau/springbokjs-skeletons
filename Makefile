install:
	npm install
	bower install
	gulp springbokjs-shim

update:
	npm update
	bower update
	gulp springbokjs-shim

clean:
	rm -Rf public/dist/*
	rm -Rf public/images/*
	gulp springbokjs-shim

watch:
	gulp watch
