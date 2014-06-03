install:
	npm install
	bower install
	gulp springbokjs-shim

update:
	sudo chown -R $USER ~/.npm node_modules
	npm prune
	npm update
	bower update
	gulp springbokjs-shim

clean:
	rm -Rf public/dist/*
	rm -Rf public/images/*
	rm -Rf lib/*
	gulp springbokjs-shim

watch:
	gulp watch --env='dev'

