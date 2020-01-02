## _init project_   
```bash
ng new BookMonkey -p bm #-p for prefix
ng generate interface shared/book
ng g c book-list
```

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

---

## Komponenten
Eine Komponente hat einen Anzeigebereich "View", in dem ein Template dargestellt wird.   
An einer Komponente wird gewöhnlich Logik verknüpft.
```javascript
@Component({
    selector: 'css-selector',
    styleUrls: ['./component-name.component.css'],
    styles: [
        'h2 { color:blue }',
        'h1 { font-size: 3em }'
    ]
    templateUrl: './component-name.html',
    template: `<h1>Hey Universe!</h1>`
})
export class ComponentName {}
```

Komponenten müssen Angular bekannt gemacht werden. Dies geschieht im AppModule.
```typescript
import { AppComponent } from './app.component';
import { FoopComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
    declarations: [
        AppComponent,
        FooComponent,
        BarComponent
    ],
    // ...
})
export class AppModule {}
```

---

## CSS-Selektoren
| Selektor | Beschreibung |
|----------|--------------|
| my-element | Elemente mit Namen my-element, z.B. `<my-element></my-element>` |
| [myAttr] | Elemente mit Attribut myAttr, z.B. `<div myAttr="foo"></div>` |
| [myAttr=bar] | Elemente mit Attribut myAttr und Wert bar, z.B. `<div myAttr="bar"></div>` |
| .my-class | Elemente mit der CSS Klasse my-class, z.B. `<div class="my-class"></div>`

---

## Template Syntax

### {{ Interpolation }}
```typescript
// bezieht sich immer auf die zugehörige Komponenten-Klasse
// im einfachsten Fall entspricht es dem Name eines Propertys
{{ name }}         // Property aus der Komponente
{{ 'foobar' }}     // String-Literal
{{ myNumber + 1 }} // Property und Addition
```

### Safe-Navigation-Operator
```typescript
{{ person?.hobbies }}
// existiert das Objekt person, werden die hobbies ausgegeben.
// es gibt aber _keinen_ Fehler, wenn das Objekt undefined oder null ist.
```

### [Property Bindings]
Schreibende Operation   
Daten fließen aus der Komponentenklasse in das Template   
Daten werden an ein DOM-element übermittelt   
```html
   .-setze Property href der "Komponente" Anker
<a [href]="myUrl">MyLink</a>
           '- auf den Wert der eigenen Property myUrl

               .- setze Property myProp der Komponente my-component
<my-component [myProp]="foo">
                        '- auf den Wert der eigenen Property foo

<element [property]="expression"></element>     <!-- expression wird ausgewertet -->
<element property="value"></element>            <!-- string wird geschrieben -->
<element property="{{ expression }}"></element> <!-- expression wird ausgewertet -->
<element [property]="'value'"></element>        <!-- string wird geschrieben -->
```

### (Event Bindings)
Lesende Operation   
Daten fließen aus dem Template in die Komponentenklasse   
```html
        .- Das Auslösen des Events 'Click'
<button (click)="myClickHandler()">Click me </button>
                 '- mit dieser Methode abfangen
```
   
### [(Two-Way Bindings)]
Lese-Schreibende Operation   
```html
<input [(ngModel)]="myProperty" type="text">
```

### #Elementreferenzen
In einem Template kann man HTML-Elemente mit Namen versehen.
```html
<input #id type="text" value="Angular">
{{ id.value }} <!-- lokale Referenz zeigt auf das DOM-Element -->
```

### *Strukturdirektiven
Steuern die Struktur des DOM-Baums, z.B. indem die Elemente hinzufügt oder entfernt.   
Wird mit einem * notiert und als Attribut auf einem DOM-Element eingesetzt.
```html
<div *ngIf="hasError">Fehler aufgetreten</div>


<ul>
    <li *ngFor="let name of names; index as i">{{i+1}}. {{ name }}</li>
</ul>
<!--
index: index des aktuellen Elements 0..n
first: wahr, wenn es das erste Element der Liste ist
last: wahr, wenn es das letzte Element der Liste ist
even: wahr, wenn der Index gerade ist
odd: wahr, wenn der Index ungerade ist
-->


<div [ngSwitch]="angularVersion">
    <span *ngSwitchCase="1">AngularJS</span>
    <span *ngSwitchCase="3">Angular 3 existiert nicht</span>
    <span *ngSwitchDefault>Angular {{ angularVersion }} </span>
</div>
```

### [Attributdirektiven]
Steuern das innere Verhalten des Elements.   
Kann auf 2 Arten verwendet werden.

!   
[directive] -> expression   
directive  -> string

```html
<div [myDirective]>="foo"></div>
<!-- weil links [] verwendet wird, bezieht sich foo auf das Property "foo" der Komponentenklasse -->

<div myDirective="foo"></div>
<!-- weil ohne [], wird foo als String ausgewertet -->
```

### | Pipes
Zur transformation von Daten für die Anzeige.   
Pipes können bei der _Interpolation_ und beim _Property-Binding_ verwendet werden.
```html
<p> {{ name | lowercase }} </p>
<p> {{ name | date | uppercase }} </p>
```

### Auslesen von DOM-Properties in Komponenten
Hier lesen wir die DOM-Eigenschaft 'myProperty' aus.
```html
<my-component [myProperty]="'foo'"></my-component>
```
```typescript
@Component({
    selector: 'my-component',
    templateUrl: './my.component.html'
})
export class MyComponent {
    @Input() myProperty: string; // DOM-Property wird mit der Komponenten-Property verknüpft. Namen sollten identisch sein
    @Input('nameOfDomPropertyToBind') myProp: string; // wenn Namen nicht identisch sind

    
    constructor() {}
}
```
