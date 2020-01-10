## _init project_   
```bash
ng new BookMonkey -p bm #-p for prefix
ng generate interface shared/book
ng g c book-list
ng g c book-list-item
ng g s shared/book-store
ng g i shared/book-raw
ng g class shared/book-factory
ng g class shared/token-interceptor
ng g c book-form
ng g c create-book
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

### ng-templates
```html
<div *ngIf="book; else loading">
    <p>Wird nur gerendert, wenn true</p>
</div>

<ng-template #loading>
  <div class="ui active centered inline loader"></div>
</ng-template>
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
```

---

## Reactive Programming

3 Arten von Ereignissen:   
- ein neues Element trifft ein (next)
- ein Fehler tritt auf (error)
- der Datenstrom (Observable) ist planmäßig zu Ende (complete)

### Ein Observable ist auch nur eine Funktion
```typescript
function observable(observer) {
    setTimeout(() => {
        observer.next(1)
    }, 1000);

    observer.next(2);
    
    setTimeout(() => {
        observer.next(3);
        observer.complete();
    }, 2000);
}

const myObserver = {
    next: value => console.log(`value: ${value}`),
    error: err => console.log(`error: ${err}`),
    complete: () => console.log('complete')
};

observable(myObserver);

// 2 --- 1 --- 3
```

### Finnische Notation
Es ist üblich ein Observable mit dem Suffix $ zu notieren.
```typescript
//                                           .- abonniert nur next
const subscription = myObservable$.subscribe(value => console.log(value));

subscription.unsubscribe();
```

### Observables erzeugen
```typescript
// über Konstruktor
const myObservable$ = new Observable(observer => {
    // producer function
    observer.next(1);
    observer.next(2);
    observer.complete();
});

//             .- erst mit subscribe wird producer function aufgerufen
myObservable$.subscribe(myObserver);


// creation functions

// erzeugt ein obervable und emmitiert unmittelbar die daten
const observable1$ = of(1, 2, 3);

// wenn die daten bereits als array vorliegen
const data = [1, 2, 3];
const observable2 = from(data);

// und andere         ms                complete
const timer1$ = timer(500);     // ----0|
const timer2$ = timer(0, 500);  // 0----1----2----3----4----...
const timer3$ = interval(500);  // ----0----1----2----3----...
```

### Operatoren
```typescript
const numbers$ = of(0, 1, 2, 3, 4);

numbers$.pipe(
    // Operatoren (aber eigentlich Funktionen)
    map(value => value * 3),
    filter(value => value % 2 === 0),
//  .- reduce                     .- seed
    scan((acc, cur) => acc + cur, 0)
);
```

### heisse und kalte Observables
Default ist kalte Oberservables.   
Kalte Observables führen ihre Producer-Funktion nur aus, wenn subscribe() aufgerufen wird. Für jeden subscribe() wird
die Producer-Funktion jedoch erneut ausgeführt.   
Datenströme entstehen nur an, wenn es einen subscriber gibt.   
Schlecht bei sideeffects. 

Heisse Observables erzeugen Datenströme auch ohne einen Subscriber.   
Der EventEmitter ist ein heisses Observable.   

Von außen kann man nicht sehen, ob ein Observable kalt oder heiss ist.

### Operator share() - kalte Observables in heisse umwandeln
```typescript
const numbers$ = new Observable(obs => {
  console.log('---new---')
  const data = [1,2,3];
  data.forEach(n => obs.next(n));
});

numbers$.subscribe(n => console.log(n)); // erster Aufruf der Producer-Funktion
numbers$.subscribe(n => console.log(n)); // zweiter Aufruf :-(

console.log('---------------------');

const sharedNumbers$ = numbers$.pipe(share());

sharedNumbers$.subscribe(console.log); 
sharedNumbers$.subscribe(console.log); // wird nicht ausgegeben, da er leider zu spät kam
```

### Multicasting mit Subjects
Mit share() lassen sich Ereignisse aus externen Quellen nicht erzeugen, denn share() benötigt ein bereits vorhandenes Observable.   
Das macht man dann mit Subjects (klassischer Eventbus).   
Technisch ist ein Subject eine Kombination aus Observable und Observer.   

Mit den 3 Observer-Funktionen kann man Daten von außen an das Subject zu übergeben.
```typescript
class Subject<T> extends Observable {
    next(value?: T)         // Observer
    error(err: any)
    complete()
    subscribe(/* ... */)    // Observable
    pipe(/* ... */)
}

// ------------------------------------------------

import { Subject } from 'rxjs';

const mySubject$ = new Subject<string>();

mySubject$.subscribe(v => console.log(v));

mySubject$.next('Hallo');
mySubject$.next('Hallo2');
```

### BehaviorSubjects
Bei normalen Subjects bekommt man erst dann die Daten, nachdem man sich abonniert hat. Kommt man zu spät, bekommt man nix.   
Um dieses "Problem" zu umgehen, gibt es BehaviorSubjects.   
Diese benötigen bei der Erstellen immer einen Startwert. Das BehaviorSubject hält intern den aktuellen State.   
Beim Aufruf von next() wird der vorherige State durch den neuen ersetzt.   
Jeder neue Subscriber erhält also immer den aktuellen State.

```typescript
import { BehaviorSubject } from 'rxjs';

const myBehaviorSubject$ = new BehaviorSubject<String>('initial');

// erster Subscriber erhält intial state
myBehaviorSubject$.subscribe(value => console.log(`subscriber 1: value ${value}`));

// state ändern
// Subscriber 1 bekommt die aktuellen state
myBehaviorSubject$.next('123456');

// neuer Subscriber, erhält den aktuellen state
myBehaviorSubject$.subscribe(value => console.log(`subscriber 2: value ${value}`));
```

### ReplaySubject
Das Replay-Subject geht einen Schritt weiter und puffert intern die letzten X Ereignisse.   
Neue Subscriber erhaäten die letzten X Events.

```typescript
import { ReplaySubject } from 'rxjs';

const myReplaySubject$ = new ReplaySubject<number>(5)

myReplaySubject$.next(1);
myReplaySubject$.next(2);
myReplaySubject$.next(3);
myReplaySubject$.next(4);
myReplaySubject$.next(5);
myReplaySubject$.next(6);

// 2 3 4 5 6
myReplaySubject$.subscribe(value => console.log(value));
```

### Memory Leaks
Wir abonnieren eine Subscription innerhalb einer Angular-Component in OnInit. Die Subscription bleibt im Hintergrund auch dann noch erhalten, wenn die Component bereits zerstört wurde (User wechselt die Seite).   
Schlimmer noch: Wird die Seite erneut aufgerufen, so wird eine weitere Subscription erzeugt.   
Wir müssen also dafür sorgen, dass wenn eine Component zerstört wird, dass auch die Subscription beendet wird.
```typescript
@Component(/* ... */)
export class MyComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    ngOnInit() {
        this.sub = myObservable$.subscribe(value => console.log(value));
    }

    ngOnDestroy() {
        sub.unsubscribe();
    }
}
```

Dieser Weg funktioniert, ist aber umständlich, wenn wir mehrere Subject abonniert haben. (jede Subscription innerhalb von ngOnDestroy unsubsriben. Und bloß nicht vergessen!).   
Etwas eleganter, wenn wir dazu den Operator takeUntil des Observables nutzen.
```typescript
@Component(/* ... */)
export class MyComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject()

    ngOnInit() {## _init project_   
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

### ng-templates
```html
<div *ngIf="book; else loading">
    <p>Wird nur gerendert, wenn true</p>
</div>

<ng-template #loading>
  <div class="ui active centered inline loader"></div>
</ng-template>
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
```

---

## Reactive Programming

3 Arten von Ereignissen:   
- ein neues Element trifft ein (next)
- ein Fehler tritt auf (error)
- der Datenstrom (Observable) ist planmäßig zu Ende (complete)

### Ein Observable ist auch nur eine Funktion
```typescript
function observable(observer) {
    setTimeout(() => {
        observer.next(1)
    }, 1000);

    observer.next(2);
    
    setTimeout(() => {
        observer.next(3);
        observer.complete();
    }, 2000);
}

const myObserver = {
    next: value => console.log(`value: ${value}`),
    error: err => console.log(`error: ${err}`),
    complete: () => console.log('complete')
};

observable(myObserver);

// 2 --- 1 --- 3
```

### Finnische Notation
Es ist üblich ein Observable mit dem Suffix $ zu notieren.
```typescript
//                                           .- abonniert nur next
const subscription = myObservable$.subscribe(value => console.log(value));

subscription.unsubscribe();
```

### Observables erzeugen
```typescript
// über Konstruktor
const myObservable$ = new Observable(observer => {
    // producer function
    observer.next(1);
    observer.next(2);
    observer.complete();
});

//             .- erst mit subscribe wird producer function aufgerufen
myObservable$.subscribe(myObserver);


// creation functions

// erzeugt ein obervable und emmitiert unmittelbar die daten
const observable1$ = of(1, 2, 3);

// wenn die daten bereits als array vorliegen
const data = [1, 2, 3];
const observable2 = from(data);

// und andere         ms                complete
const timer1$ = timer(500);     // ----0|
const timer2$ = timer(0, 500);  // 0----1----2----3----4----...
const timer3$ = interval(500);  // ----0----1----2----3----...
```

### Operatoren
```typescript
const numbers$ = of(0, 1, 2, 3, 4);

numbers$.pipe(
    // Operatoren (aber eigentlich Funktionen)
    map(value => value * 3),
    filter(value => value % 2 === 0),
//  .- reduce                     .- seed
    scan((acc, cur) => acc + cur, 0)
);
```

### heisse und kalte Observables
Default ist kalte Oberservables.   
Kalte Observables führen ihre Producer-Funktion nur aus, wenn subscribe() aufgerufen wird. Für jeden subscribe() wird
die Producer-Funktion jedoch erneut ausgeführt.   
Datenströme entstehen nur an, wenn es einen subscriber gibt.   
Schlecht bei sideeffects. 

Heisse Observables erzeugen Datenströme auch ohne einen Subscriber.   
Der EventEmitter ist ein heisses Observable.   

Von außen kann man nicht sehen, ob ein Observable kalt oder heiss ist.

### Operator share() - kalte Observables in heisse umwandeln
```typescript
const numbers$ = new Observable(obs => {
  console.log('---new---')
  const data = [1,2,3];
  data.forEach(n => obs.next(n));
});

numbers$.subscribe(n => console.log(n)); // erster Aufruf der Producer-Funktion
numbers$.subscribe(n => console.log(n)); // zweiter Aufruf :-(

console.log('---------------------');

const sharedNumbers$ = numbers$.pipe(share());

sharedNumbers$.subscribe(console.log); 
sharedNumbers$.subscribe(console.log); // wird nicht ausgegeben, da er leider zu spät kam
```

### Multicasting mit Subjects
Mit share() lassen sich Ereignisse aus externen Quellen nicht erzeugen, denn share() benötigt ein bereits vorhandenes Observable.   
Das macht man dann mit Subjects (klassischer Eventbus).   
Technisch ist ein Subject eine Kombination aus Observable und Observer.   

Mit den 3 Observer-Funktionen kann man Daten von außen an das Subject zu übergeben.
```typescript
class Subject<T> extends Observable {
    next(value?: T)         // Observer
    error(err: any)
    complete()
    subscribe(/* ... */)    // Observable
    pipe(/* ... */)
}

// ------------------------------------------------

import { Subject } from 'rxjs';

const mySubject$ = new Subject<string>();

mySubject$.subscribe(v => console.log(v));

mySubject$.next('Hallo');
mySubject$.next('Hallo2');
```

### BehaviorSubjects
Bei normalen Subjects bekommt man erst dann die Daten, nachdem man sich abonniert hat. Kommt man zu spät, bekommt man nix.   
Um dieses "Problem" zu umgehen, gibt es BehaviorSubjects.   
Diese benötigen bei der Erstellen immer einen Startwert. Das BehaviorSubject hält intern den aktuellen State.   
Beim Aufruf von next() wird der vorherige State durch den neuen ersetzt.   
Jeder neue Subscriber erhält also immer den aktuellen State.

```typescript
import { BehaviorSubject } from 'rxjs';

const myBehaviorSubject$ = new BehaviorSubject<String>('initial');

// erster Subscriber erhält intial state
myBehaviorSubject$.subscribe(value => console.log(`subscriber 1: value ${value}`));

// state ändern
// Subscriber 1 bekommt die aktuellen state
myBehaviorSubject$.next('123456');

// neuer Subscriber, erhält den aktuellen state
myBehaviorSubject$.subscribe(value => console.log(`subscriber 2: value ${value}`));
```

### ReplaySubject
Das Replay-Subject geht einen Schritt weiter und puffert intern die letzten X Ereignisse.   
Neue Subscriber erhaäten die letzten X Events.

```typescript
import { ReplaySubject } from 'rxjs';

const myReplaySubject$ = new ReplaySubject<number>(5)

myReplaySubject$.next(1);
myReplaySubject$.next(2);
myReplaySubject$.next(3);
myReplaySubject$.next(4);
myReplaySubject$.next(5);
myReplaySubject$.next(6);

// 2 3 4 5 6
myReplaySubject$.subscribe(value => console.log(value));
```

### Memory Leaks
Wir abonnieren eine Subscription innerhalb einer Angular-Component in OnInit. Die Subscription bleibt im Hintergrund auch dann noch erhalten, wenn die Component bereits zerstört wurde (User wechselt die Seite).   
Schlimmer noch: Wird die Seite erneut aufgerufen, so wird eine weitere Subscription erzeugt.   
Wir müssen also dafür sorgen, dass wenn eine Component zerstört wird, dass auch die Subscription beendet wird.
```typescript
@Component(/* ... */)
export class MyComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    ngOnInit() {
        this.sub = myObservable$.subscribe(value => console.log(value));
    }

    ngOnDestroy() {
        sub.unsubscribe();
    }
}
```

Dieser Weg funktioniert, ist aber umständlich, wenn wir mehrere Subject abonniert haben. (jede Subscription innerhalb von ngOnDestroy unsubsriben. Und bloß nicht vergessen!).   
Etwas eleganter, wenn wir dazu den Operator takeUntil des Observables nutzen.
```typescript
@Component(/* ... */)
export class MyComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject()

    ngOnInit() {
        myObservable1$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(value => console.log(value));

        myObservable2$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(value => console.log(value));
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
```

### Higher-Order Observables
Beispiel-Code: https://stackblitz.com/edit/rxjs-sushi

Verschachtelte Subscriptions sind nicht gut.   
```typescript
// Antipattern!
timer$.subscribe(() => {
  http$.subscribe(data => console.log(data));
});
```

Map reicht nichtr aus, denn dann bekämen wir Observable<Observable<T>>
```typescript
// Antipattern!
timer$
.pipe(
  map(() => http$)
)
```

Flattening Strategien um Observable<Observable<T>> zu vermeiden.   
```typescript
// Antipattern!
timer$
.pipe(
  mergemap(() => http$)
)
```

Es gibt 4 Operatoren, denn genestete Observables flatten:   

concatMap   
Erzeugt die nächste Subscription erst dann, sobald das vorherige Observable completet ist. Die Reihenfolge bleibt erhalten, weil die Observables nacheinander abgearbeitet werden.   
_gierig aber ruhig_: Wir nehmen uns neue Teller, essen aber zunächst den aktuellen Teller leer, dann widmen wir uns dem nächsten.   

mergeMap   
Verwaltet alle Subscriptions parallel und führt die Ergebnisse in der Reihenfolge ihres Auftretens zusammen. Die Reihenfolge kann sicher ändern.   
_alles durcheinander_: Wir essen sofort vom neu geholten Teller. Haben wir noch einen Teller vor uns, so essen wir von mehreren parallel, bis sie leer sind.   

switchMap   
Beendet die laufende Subscription, sobald ein neuer Wert im Quelldatenstrom erscheint. Nur das zuletzt angefragte Observable ist interessant.   
_verschwenderisch_: Wir nehmen einen Teller, werfen den alter Teller weg und widmen uns sofort dem neuen.   

exhaustMap   
Ignoriert alle Werte aus dem Quelldatenstrom, solange noch eine Subscription läuft. Erst wenn die Leitung wieder frei ist, werden neue eingehende Werte bearbeitet.   
_bescheiden und ruhig_: Wir nehmen keine Teller vom Band, solange wir noch einen vor uns haben.

---

## Interceptopren
Interceptoren sind eine Middleware für Http-Kommunikation.   
Interceptopren lönnen für alle Http-Anfragen und Antworten ausgeführt und an globaler Stelle Entscheidungen und Umwandlungen vornehmen.   
z.B. zum setzen zusätzlicher Header, oder weitere Funktionen ausführen.   
- Sicherheitsfunktionen
- setzen zusätzlicher Headerfelder, z.B. für Caching
- Logging
- Anzeige von Zustandsinformationen zum Request (Anfrage noch aktiv, oder nicht?)
- globales Abfangen von Fehlern, z.B. mit retry() oder catchError()
Grundsätzlich werden alle Interceptoren _vor_ dem Versenden eines Requests ausgeführt.   
Beim Request von 1 .. n
Beim Response von n .. 1

Technisch ist ein Intercepot ein Service, der über DI in die Apop integriert wird (benötigt @Injectable).   
Interceptoren werden immer explizit als Provider registriert.

https://ryanchenkie.com/securing-angular-applications/

```typescript
//leerer Interceptor
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  // diese Funktion ist der Kern eines Interceptors
  intercept(
    request: HttpRequest<any>,    // request liegt als Observable vor
    next: HttpHandler             // nächster Handler in der pipeline
  ): Observable<HttpEvent<any>> {

    // Http-Request verarbeiten
    const response$ = next.handle(request);

    return response$.pipe(
      // Http-Response verarbeiten
    )

  }

}
```

```typescript
// logging Interceptor
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  // diese Funktion ist der Kern eines Interceptors
  intercept(
    request: HttpRequest<any>,    // request liegt als Observable vor
    next: HttpHandler             // nächster Handler in der pipeline
  ): Observable<HttpEvent<any>> {

    console.log('request: ', request);

        const response$ = next.handle(request);

    return next.handle(request)
              .pipe(
                tap(
                  event => console.log('response success:', event),
                  event => console.errer('response error: ', error)
                )
              );
  }
}
```

Interceptoren werden in dem Modul registriert, in dem auch das HttpClientModule importiert wird.   
In der Regel ist es das AppModule.
```typescript
// Interceptor einbinden
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './logging-interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

---

## Template driven Forms
Hierbei bindet sich an Inputfelder, Checkboxen etc. Die Daten aus den Formularen werden automatisch mit den Daten in der Component synchronisiert.   

### FormsModule einbinden
Um Template driven Forms nutzen zu können muss das FormsModule in der App importiert werden.

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule
    ]
})
export class AppModule { }
```

### Datenmodell in der Component
Die zu verarbeitenden Daten sollten in der Component als _ein_ zusammenhängendes Objekt vorliegen.

```typescript
@Component( /* ... */)
export class MyComponent {
    formData = {
        username: '',
        passwort: ''
    }
}
```

### Template mit 2-Way Binding
Jedes Formularfeld sollte ein name-Attribut besitzen, damit Angular die Felder identifizieren kann.   
Ferner ist ein Submit-Button nötig.   

Gibt der Benutzer etwas ein, so wird über dein Event das Datum an die Component übertragen.   
Über das Property-Binding können wir aus der Component Daten an die Form binden.
```html
<form>
    <label>Benutzername</label>
    <input type="text" name="username" [(ngModel)="formData.username"]>

    <label>Passwort</label>
    <input type="password" name="passwort" [(ngModel)="formData.password"]>

    <button type="submit">Login</button>
</form>
```

### Formularzustand verarbeiten
Für jedes Formularelement wurde die Direktive ngModel verwendet.   
Dabei wird automatisch für jedes Element ein FormControl initialisiert.   
Angular kontrolliert über das FormControl den Zustand des jeweiligen Elements und bietet uns über das FormControll eine Schnittstelle, um mit diesem Zustand arbeiten zu können.   
Ein FormControl kann 6 Zustände haben:
| Status    | CSS-Klasse    | Beschreibung
|-----------|---------------|-
| dirty     | ng-dirty      | Wert wurde bearbeitet
| pristine  | ng-pristine   | Wert ist unberührt
| valid     | ng-valid      | Wert ist gültig
| invalid   | ng-invalid    | Wert ist ungültig
| touched   | ng-touched    | Control wurde verwendet / bedient
| untouched | ng-untouched  | Control wurde noch nicht verwendet

Die CSS-Klassen lassen sich nutzen, um den Elemente passend zum Zustand zu stylen.   
Für komplexere Reaktionen kann auch direkt auf das FormControl zugegriffen werden. Dazu muss man im Template eine Elementreferenz einbauen, die auf ngModel verweist.
```html
<form>
    <label>Benutzername</label>
    <input type="text" name="username" [(ngModel)="formData.username"] #usernameInput="ngModel">

    <div *ngIf="usernameInput.untouched">
        Feld ist unberührt.
    </div>

    <!-- -->
</form>
```

### Eingaben validieren
Bereits in Angular eingebaute Validatoren werden als Attribute auf den Formularfeldern gesetzt. Auf jedem Element können mehrere Validatoren hinterlegt werden.   
Bereits eingebaut sind
| Attribut      | Prüfung
|-------------------|-
| required          | Feld muss ausgefüllt sein
| requiredTrue      | muss true sein
| minlength="6"     | min. 6 Zeichen
| maxlength="8"     | max. 8 Zeichen
| pattern="[a-z]"   | überprüft auf RegEx. Hier, nur Kleinbuchstaben von a-z
| email             | gültige Email-Adresse

```html
<form>
    <!-- -->

    <label>Passwort</label>
    <input  type="password"
            name="passwort"
            [(ngModel)="formData.password"]
            required
            minlength="8"
            pattern=".*\d.*"> <!-- muss eine Zahl enthalten -->

    <button type="submit">Login</button>
</form>
```

### Formular abschicken
Hier benötigt man zunächst eine Funktion in der Component, die aufgerufen wird.   
Die Daten aus dem Formular liegen bereits durch das 2-Way Binding in der Component vor.

```typescript
@Component({/* ... */})
export class MyComponent {
    formData = { /* ... */}

    submitForm() {
        console.log(this.formData);
    }
}
```

Im Template müssen wir dann das Formular mit der Funktion verknüpfen. Dazu binden wir an das Event ngSubmit.
```html
<form (ngSubmit="submitForm()")>
    <!-- -->

    <button type="submit">Login</button>
</form>
```

### Formular reset - mit dem Decorator @ViewChild
Angular initialisiert vollautomatisch für jedes <form> Element eine Direktive namens NgForm.   
Zugriff auf dieses NgForm erhalten wir wieder über eine Elementreferenz, die diesmal jedoch auf ngForm verweist.
<form #myForm="ngForm">
    <!-- -->

    <button type="submit">Login</button>
</form>
```
Auf diesem Objekt existiert u.a. die Funktion reset().   
Damit wird aus der Component heraus Zugriff auf diese Elementreferenz (im Template) erhalten, benötigt man den Decoreator @ViewChild.   
Das Argument für den Decorator ist der Name der Elementreferenz.

```typescript
@Component({/* ... */})
export class MyComponent {
    //                           .- Typ des Elements, dass wir referenzieren
    @ViewChild('myForm') myForm: NgForm;
    formData = { /* ... */}

    submitForm() {
        console.log(this.formData);

        // ...

        this.myForm.reset();
    }
}
```

__! ! !__   
__Das NgForm-Objekt kann für viele weitere Zwecke verwendet werden, da es immer _alle_ Zustände seiner Formularelemente kennt (z.B. für komplexe Validierungsregeln).__

## date value accessor
Der direkte Zugriff auf ein Date-Objekt mit ngModel funktioniert leider nicht.   
Abhilfe schafft ein zusätzlich zu installierendes Paket:
```bash
npm i --save angular-date-value-accessor
```
Dieses muss dann entsprechend wieder im Modul eingebunden werden.

---

## Reactive Forms
Die Grundidee von ReactiveForms ist, dass nicht nur die reinen Formulardaten in der Component sind, sondern alle FormsControls mit ihren Zuständen, Validierungsregeln und Werten.   
Um eine Formularstruktur aufzubauen stehen 3 Klassen zur Verfügung:
- FormControl
- FormGroup
- FormArray

#### FormControl
Jedes Formularfeld wird durch eine FormControl repräsentiert. Man kann bei der Initilaisierung einen Startwert angeben, ansonsten ist dieser null.
```typescript
new FormControl();
newFormControl('Startwert');
```

#### FormGroup
! Controls in einem Objekt zusammenfassen   
Quasi ein Container zum Zusammenfassen von FormControls. Ein Formular _sollte_ auf oberster Ebene _immer_ aus einer FormGroup bestehen.   
Die Hineingereichten FormControls bekommen einen Namen zur Identifizierung.   
Um eine Hierarchie aufzubauen kann man in einer FormGroup auf weitere FormGroups einbetten.   
Die Blätter dieses Baums sind allerdings _immer_ FormControls.
```typescript
new FormGroup({
    username: new FormControl(''),
    name: new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl('')
    })
});
```

#### FormArray
! Controls in einem Array zusammenfassen   
```typescript
new FormArray([
    new FormControl(''),
    new FormControl(''),
    new FormGroup([
        new FormControl(''),
        new FormControl('')
    ]),
    new FormArray([
        new FormControl(''),
        new FormControl('')
    ])
])
```

### FormsModule einbinden
Um reactive Forms nutzen zu können muss das ReactiveFormsModule importiert werden.
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule
    ]
})
export class AppModule { }
```

### Komplexes Formularmodell
```typescript
@Component({/* ... */})
export class MyFormConponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),

            name: new FormGroup({
                firstname: new FormControl(''),
                lastname: new FormControl('')
            }),

            email: new FormArray([
                new FormControl(''),
                new FormControl(''),
                new FormControl('')
            ])
        });
    }
}
```

### Template mit dem Modell verknüpfen
! ! ! Die Hierarchie der FormGroup entspricht der Hierarchie im Template ! ! !   

Formular mit dem Modell verknüpfen
```html
<form [formGroup]="myForm">
    <!-- -->
</form>
```

Formularfelder mit formControlName an FormControls knüfen
```html
<form [formGroup]="myForm">
    <label>Benutzername</label>
    <input formControlName="username" type="text">

    <label>Passwort</label>
    <input formControlName="password" type="password">
    <!-- -->
</form>
```

Mehrere Formularfelder mit formGroupName   
formGroupName muss auf ein umschließendes Element angewandt werden, z.B. fieldset.
```html
<form [formGroup]="myForm">
    <!-- -->

    <fieldset formGroupName="name">
        <label>Vorname</label>
        <input formControlName="firstname" type="text">

        <label>Nachname</label>
        <input formControlName="lastname" type="text">
    </fieldset>

    <!-- -->
</form>
```

formArrayName - schön dynamisch bleiben   
```html
<form [formGroup]="myForm">
    <fieldset formArrayName="email">
        <label>Email-Adressen</label>
        <input 
            type="text"
            *ngFor="let control of myForm.get('email').controls; index as i"
            [formControlName]="i">
    </fieldset>
</form>
```

### Formularzustand überwachen
Man benötigt wieder direkten Zugriff auf die FormControls. Da das Formularmodell nun aber direkt in der Component definiert ist, ist kein zusätzlicher Codeaufwand nötig.   
Man kan also direkt aus dem Template und der Component mit den Controls interagieren.   
Bei formArray -> at(n)   
Bei formGroup -> get('key')
```html
<form [formGroup]="myForm">
    <label>Benutzername</label>
    <input formControlName="username" type="text">

    <div *ngIf="myForm.get('username').untouched">
        Das Feld ist unberührt.
    </div>
    <!-- -->
</form>
```

### Validatoren nutzen
Die Validatoren müssen in der Component importiert werden
```typescript
import { Validators } from '@angular/forms';

@Component({/* ... */})
export class MyFormConponent implements OnInit {
    myForm: FormGroup;
    // ...
}
```

Validatoren werden als 2. Argument in new FormControl(...) hineingegeben. Die Validatoren werden in der entsprechenden Reihenfolge ausgeführt.
```typescript
import { Validators } from '@angular/forms';

@Component({/* ... */})
export class MyFormConponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('', [Validators.required, Validators.minLenmgth(6)]),

            name: new FormGroup({
                firstname: new FormControl(''),
                lastname: new FormControl('')
            }),

            email: new FormArray([
                new FormControl('', Validators.email),
                new FormControl(''),
                new FormControl('')
            ])
        });
    }
}
```

### Formular abschicken
```html
<form [formGroup]="myForm" (ngSubmit)="submitForm()">
    <!-- -->

    <button type="submit">Register</button>
</form>
```

```typescript
@Component(/* ... */)
export class MyFormComponent {
    //
    submitForm() {
        console.log(this.myForm.value);
    }
}
```

### Formular zurücksetzen
```typescript
@Component(/* ... */)
export class MyFormComponent {
    // ...
    submitForm() {
        // ...
        this.myForm.reset();
    }
}
```

### Formularwerte setzen
Mit ReactiveForms haben wir _nur_ Zugriff auf das Formularmodell, nicht direkt auf die Daten. Diese sind in den FormControls verankert.   
Um an die Werte zu kommen gibt es 2 Helper-Funktionen:
- setValue()    -> damit kann man die Werte des gesamten Formular neu setzen
- patchValue()  -> für einzelne Felder

```typescript
const myForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
});

myForm.setValue({
    username: 'Marcello',
    password: 'secret'
});

myForm.patchValue({
    username: 'Inge'
});

// Fehler, da Struktur nicht vollständig!
myForm.setValue({
    username: 'Inge'
});
```

### Formbuilder
Um die Initialisierung von Formularen zu verinfachen kann man den FormBuilder nutzen.   
Die Änderungen bei Verwendung beziehen sich rein auf die Component, das Template kann erhalten bleiben.   
Der FormBuilder wird in die Component injiziert, z.B. über ein Property.

```typescript
import { Formbuilder } from '@angular/forms';

@Component({/* ... */})
export class MyFormComponent implements OnInit {
    myForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            username: ['', Validators.required],
            password: '',
            name: this.fb.group({
                firstname: '',
                lastname: ''
            }),
            email: this.fb.array(['', '', ''])
        })
    }
}
```

### Änderungen überwachen
Jedes FormControl, FormGroup und FormArray beseitzt zwei reaktive Properties:
- valueChanges
- statusChanges
Dahinter verbergen sich Observables, welche man entsprechend subscriben kann.   
Damit lassen sich komplexere UseCases reaktiv abbilden.

```typescript
// Formularwerte ausgeben
this.myForm
    .valueChanges
    .subscribe(groupValue => console.log(groupValue));

// Http-Request für jede Eingabe triggern
this.myForm
    .get('username')
    .valueChanges
    .pipe(
        debounceTime(300),
        switchMap(username => this.service.getUser(username))
    )
    .subscribe(user => console.log(user));
```