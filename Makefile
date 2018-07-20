build-plume2: clean-plume2 
	npx tsc --project packages/plume2/tsconfig.json
	npx	tsc --project packages/plume2/tsconfig-es6.json 
	@echo "build plume2 successfully ❤️ \n"

clean-plume2:
	rm -rf packages/plume2/es5
	rm -rf packages/plume2/es6
	@echo "clean plume2 successfully 👏 \n"