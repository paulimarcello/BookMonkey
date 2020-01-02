## _init project_   
ng new BookMonkey -p bm   
-p for prefix

## schlankes semantic ui installieren (nur css)   
```bash
npm install semantic-ui-css
```   
ins Projekt einbinden über angular.json   
-> projects -> BookMonkey -> architect -> build -> options -> styles   
-> projects -> BookMonkey -> architect -> test -> options -> styles   
```json
"styles": [
    "node_modules/semantic-ui-css/semantic.css",
    "src/styles.css"
],
```   

Alternativ kann man die Styles auch per Import-Regel in der styles.css hinzufügen.   
Die ~ wird von Webpack automatisch ersetzt durch node_modules.
```javascript
@import '~semantic-ui-css/semantic.css';
```