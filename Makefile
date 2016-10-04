licenses.json: licenses.yaml
	catmandu convert YAML to JSON --array 0 < $< > $@
