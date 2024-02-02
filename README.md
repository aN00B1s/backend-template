https://marketplace.visualstudio.com/items?itemName=biomejs.biome

```
rm -rf .git && mv env .env && npm i
```

settings.json
```json
	"[javascript]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[typescript]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[json]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[jsonc]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"editor.codeActionsOnSave": {
		"source.organizeImports.biome": "explicit",
		"quickfix.biome": "explicit"
	}
```
