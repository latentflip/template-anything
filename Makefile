lib/parser.js: lib/parser.peg
	./node_modules/.bin/pegjs \
		--allowed-start-rules FileTemplate,Script,ScriptExpression \
		$< $@
