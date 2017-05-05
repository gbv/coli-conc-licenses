licenses.json: licenses.yaml
	catmandu convert YAML to JSON --pretty 1 --canonical 1 --array 0 \
		--fix 'add_field("@context","https://gbv.github.io/jskos/context.json")'\
		< $< > $@
