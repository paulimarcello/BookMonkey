## _init project_   
```bash
ng new BookMonkey -p bm #-p for prefix
ng generate interface shared/book
ng g c book-list
ng g c book-list-item
ng g s shared/book-store
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
Alle nativen DOM-Events können mit Event-Bindings abgefangen werden.   
https://www.w3.org/TR/uievents/

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

### der ng-container
wenn wir mal kein DOM-Element benötigen
```html
<span *ngFor="let item of ['a', 'b', 'c']">
    {{ item }}
</span>
<!--
    <span>a</span><span>b</span><span>c</span>
-->

<ng-container *ngFor="let item of ['a', 'b', 'c']">
    {{ item }}
</ng-container>
<!--
    abc
-->
```

---

## Services

```typescript
@Injectable()
export class MyService {
    constructor(private myDep: MyDependency) {}
}
```

### Abhängigkeiten explizit registrieren mit Providers
Der Service wird in einem Modul registriert. Dafür bietet der Decorator die Eigenschaft providers an.   
Klassen, die auf diese Weise registriert werden, können von anderen Klassen über den Konstruktor angefordert werden.   

_Problem:_   
Services, die zwar in einem Modul registriert, von der Anwendung jedoch niemals angefordert (also benutzt) wird, können nicht
heraus-gebundled werden.
```typescript
@NgModule({
    declarations:   [AppComponent],
    imports:        [BrowserModule],
    providers:      [MyService],
    bootstrap:      [AppComponent]
})
export class AppModule {}
```

### Tree-shakable Providers mit prividedIn
Die Idee ist, die Importbeziehung zwischen Service und Modul umzukehren. Der Service wird nicht mehr explizit im Modul
registriert, sondern meldet sich eigenständig in einem Modul an.   
Wird der Service von keiner Komponente angefordert, so besteht auch keine Referenz und damit würde dieser beim Build
entfallen.
 ```typescript
@Injectable({
    providedIn: 'root' // in welches Modul der Provider eingetragen werden soll 
})
 export class MyService {
     constructor(private myDep: MyDependency) {}
 }
 ```

### Abhängigkeiten ersetzen
Man kann in einem Modul die konkrete Implementierung austauschen.   
... oder konkrete Werte auflösen   
```typescript
@NgModule({
    //...
    providers: [
        { provide: MyService, useClass: MyOtherService },
        { provide: MyConfigToken, useValue: 'xyz' },
        { provide: BetterService,
            useFactory: (otherDependency: OtherDependency) => { return new BetterService(otherDependency) },
            deps: [OtherDependency] 
        }   
    ]
})
export class AppModule {}
```

### Abhängigkeiten anfordern mit @Inject
Wenn man Abhängigkeiten anfordert, die keine Typescript-Klassen darstellen
```typescript
@Component({/*...*/})
export class SomeComponent {
    constructor(@Inject('MyConfigToken') private token: string) {}
}
```

### InjectionToken
Besser ist jedoch die Verwendung von InjectionToken
```typescript
// Tokens in einer eigenen Datei auslagern
export const MY_CONFIG_TOKEN = new InjectionToken<string>('myConfig');

@NgModule({
    //...
    providers: [
        { provide: MY_CONFIG_TOKEN, useValue: '1234567890' }
    ]
})
export class AppModule {}


@Component({/*...*/})
export class SomeComponent {
    constructor(@Inject(MY_CONFIG_TOKEN) private token: string) {}
}
```

### Multiprovider
Hier bekommt man ein Array mit allen registrierten Werten
```typescript
// Tokens in einer eigenen Datei auslagern
export const MY_CONFIG_TOKEN = new InjectionToken<string>('myConfig');

@NgModule({
    //...
    providers: [
        { provide: MY_CONFIG_TOKEN, useValue: '123', multi: true },
        { provide: MY_CONFIG_TOKEN, useValue: '456', multi: true },
        { provide: MY_CONFIG_TOKEN, useValue: '789', multi: true }
    ]
})
export class AppModule {}
```

---

## Routing
Die URL beschreibt den Anwendungszustand, und für jeden Zustand wird angegeben, welche
Komponenten geladen werden soll.

__Routen konfigurieren:__   
Wir weisen einem URL-Pfad eine zu ladende Komponente zu.   

__Routing-Modul einbauen:__   
Wir binden das Routing in unsere Anwendung ein.

__Komponenten anzeigen:__   
Festlegen, wo die Komponente in das Template geladen wird.

```typescript
// kein '/' voranstellen!
{ path: 'myPath', component: MyComponent }
```

```typescript
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: StartComponent, pathMatch: 'full' }, //wirklich nur dann, wenn / aufgerufen wird
    { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent }
];

@NgModule({
//          .- mit dem Import machen wir die Schnittstelle zum AngularRouter verfügbar
//          |            .- liefert ein Modul mit unseren initialisierten Routen 
  imports: [RouterModule.forRoot(routes)],
//          .- das erstellte Modul wird Verfügbar gemacht
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Router-Outlet
Zuvor konnten wir einfach den CSS-Selektor '<my-component>' nutzen, um eine Komponenten zu renden.
Das haben wir quasi hart verdrahtet.   
Durch das Routing werden die Komponenten aber nun dynamisch geladen, und zwar dahin, wo
'<router-outlet>' definiert wird.
```html
<h1>My App</h1>
<router-outlet></router-outlet>
```

### Routen verlinken
Die Nutzung von '<a href=...'> ist keine gute Idee, da der Browser bei einem normalen Link
einen HTTP-Request absetzen würde. Das ist bei SPA nicht gewollt.   
Daher RouterLink benutzen.   
```html
<a routerLink="/first">Erster Link</a><!-- praktisch, wenn man wirklich nur einen String übergeben will -->
<a [routerLink]="['/second']">Zweiter Link</a><!-- besser, wenn Parameter dynamisch gefüllt werden müssen -->
```

### Routen Parameter
```typescript
const routes: Routes = [
    { path: '', component: StartComponent, pathMatch: 'full' }, //wirklich nur dann, wenn / aufgerufen wird
    { path: 'first', component: FirstComponent },
    { path: 'second', component: SecondComponent },
    { path: 'myPath/:id', component: MyComponent } //:id ist Parameter. Lässt sich nun aber nicht mehr ohne Parm aufrufen!
];
```
```html
<a routerLink="/myPath/42">Link auf 42</a>
<a [routerLink]="['/myPath', myData.Id]">Dynamische Id</a>
```
### Auslesen der Routeninformationen in einer Komponente.   
```typescript
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    id: number;
    
//                             .- damit lässt sich der Zustand der aktuellen Routers abfragen
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
//                                    .- liefert alle Parameter der aktiven Route
        this.id = this.route.snapshot.paramMap.get('id');
    }
}
```
Schwachstelle: Wird die Komponente erneut mit anderen Parameters aufgerufen, so erfährt die Komponente nichts
von den neuen Parametern, da die Komponente nicht neu instanziiert wird. Auch ngOnInit wird _nicht_ erneut
aufgerufen.   
Das Problem lässt sich nur mit Observables lösen.
```typescript
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    id: number;
    
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe(
            paramMap => this.id = paramMap.get('id');        
        );
    }
}
```

### Verschachtelung von Routen
Routen:   
/user
/user/list
/user/add
/user/edit
/books

```typescript
const routes: Routes = [
    {
        path: 'books',
        component: BooksComponent    
    },
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: 'list',
                component: UserListComponent
            },
            {
                path: 'add',
                component: UserAddComponent
            },
            {
                path: 'edit',
                component: UserEditComponent
            },
        ]    
    }
]
```
```html
<!-- von UserComponent zu UserListComponent -->
<a routerLink="list">...</a>

<!-- von UserListComponent zu BooksComponent -->
<a routerLink="/books">...</a> oder
<a routerLink="../../books">...</a>
```

### Routenweiterleitung
/user würde nicht funktionieren, da /user kein Blatt ist, sondern nur ein Zwischenknoten.   
Man könnte entweder eine künstliche Komponente hinzufügen, oder besser redirecten.
```typescript
const routes: Routes = [
    {
        path: 'books',
        component: BooksComponent    
    },
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: UserListComponent
            },
            {
                path: 'add',
                component: UserAddComponent
            },
            {
                path: 'edit',
                component: UserEditComponent
            },
        ]    
    }
]
```

### aktive Links stylen
Zauberwort: __routerLinkActive__
```html
<a routerLink="/user" routerLinkActive="cssClassToApply">...</a>
<a routerLink="/books" routerLinkActive="cssClassToApply1 cssClassToApply2">...</a>
<a routerLink="/" [routerLinkActive]="['cls1', 'cls2']">...</a>

<!-- funktioniert auch auf Elternelemente. Wird auf den Container angewandt, wenn eines der Kinder aktiv ist. -->
<div routerLinkActive="cls1">
    <a routerLink="/user">User</a>
    <a routerLink="/books">Books</a>
</div>
```

### Route programmatisch wechseln
```typescript
@Component({ /* ... */ })
export class MyComponent {
    constructor(private router: Router) {}

    changeTheRoute(){
//                           .- Liste an Routen-Segmenten
        this.router.navigate(['/user', 'list']);
        // oder
        this.router.navigateByUrl('/user/list');    
    }
}
```

---

## HTTP und reactive Programming
Um den HTTP-Client nutzen zu können muss dieser im Module importiert werden.   
!!! Dieses Module darf nur einmal in der gesamten Anwendung importiert werden !!!
```typescript
@NgModule({
    //...
    imports: [
        // ...
        HttpClientModule
    ]
})
export class AppModule { }
```
```typescript
interface Item {
    id: number;
    name: string;
}

// wenn wir nur an den body interessiert sind
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    myItems: Item[];

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient.get<Item[]>('http://example.org/api/items')
            .subscribe(items => this.myItems = items);
    }
}

// wenn wir an den gesamten response interessiert sind
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    // status       -> Statuscode, z.B. 200
    // statusText   -> Beschreibung des Codes, z.B. OK
    // url          -> angefragte URL
    // headers      -> Header der Antwort als Objekt
    // body         -> Nutzdaten vom Typ Item[]
    myResponse: HttpResponse<Item[]>;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient
            .get<Item[]>(
                'http://example.org/api/items',
                { observe: 'response' }
            )
            .subscribe(response => this.myResponse = response);
    }
}
```

### zusätzliche Header setzen
```typescript
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    ngOnInit() {
        const headers = new HttpHeaders({
            'My-Header': 'my-header-value'
        });
    
        this.httpClient
            .get(
                'http://example.org/api/items',
                { headers }
            )
            .subscribe(response => console.log(response));
    }
}
```

### Query-Parameter übermitteln
Grundsätzlich sparsam damit umgehen, da die Limits der URL-Länge browserunterschiedlich sind.   

Erzeugt folgende URL:   
http://example.org/api/items?orderBy=date&orderDirection=DESC&filter=Sucherbegriff1&filter=Suchbegriff2
```typescript
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    ngOnInit() {
        const baseParams = new HttpParams({
            fromObject: {
                orderBy: 'date',
                orderDirection: 'ASC'
            }        
        });

        // zusätzliche Parameter
        const params = baseParams
            .set('orderDirection', 'DESC') //überschreibt und gibt neues Objekt zurück
            .append('filter', 'Suchbegriff1') // fügt hinzu und gibt neues Objekt zurück
            .append('filter', 'Suchbegriff2')
    
        this.httpClient
            .get(
                'http://example.org/api/items',
                { params }
            )
            .subscribe(response => console.log(response));
    }
}
```

### Antwort ohne JSON verarbeiten
HttpClient geht default davon aus, dass alles in JSON geliefert wird.   
Wenn nicht, dann muss der responseType gesetzt werden.   
responseType = json | blob | text
```typescript
@Component({ /* ... */ })
export class MyComponent implements OnInit {
    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient
            .get(
                'http://example.org/foo.txt',
                { responseType: 'text' }
            )
            .subscribe(response => console.log(response));


        this.httpClient
            .get(
                'http://example.org/bar.jpg',
                { responseType: 'blob' }
            )
            .subscribe(response => console.log(response));
    }
}
