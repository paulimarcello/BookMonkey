import { Injectable } from '@angular/core';
import {Book} from './book';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, retry, catchError} from 'rxjs/operators';
import { BookRaw } from './book-raw';
import { BookFactory } from './book-factory';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com';

  books: Book[];

  constructor(private http: HttpClient) {
    // this.books = [
    //   {
    //     isbn: '1617294047',
    //     title: 'ELM in Action',
    //     authors: ['Richard Feldman'],
    //     published: new Date(2019, 12, 28),
    //     subtitle: '',
    //     rating: 4,
    //     thumbnails: [
    //       {
    //         url: 'https://images-na.ssl-images-amazon.com/images/I/41YGlKW89nL._SX397_BO1,204,203,200_.jpg',
    //         title: ''
    //       }
    //     ],
    //     description: 'Elm is more than just a cutting-edge programming language, it\'s a chance to upgrade the way developers think about building web applications. Elm in Action teaches readers how to build well-designed, highly performant web applications using the Elm language. As they read, they\'ll follow an application called Photo Groove that will show them how to structure their application\'s domain and behavior, how to maintain a pleasantly modular architecture, and how to deliver a quality product using the Elm language. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications.'
    //   },
    //   {
    //     isbn: '1617295027',
    //     title: 'Elixir in Action, 2nd Edition',
    //     authors: ['Saša Juric'],
    //     published: new Date(2019, 1, 12),
    //     subtitle: '',
    //     rating: 5,
    //     thumbnails: [
    //       {
    //         url: 'https://images-na.ssl-images-amazon.com/images/I/51U2%2BEota0L._SX397_BO1,204,203,200_.jpg',
    //         title: ''
    //       }
    //     ],
    //     description: 'Elixir in Action, Second Edition teaches you how to build production-quality distributed applications using the Elixir programming language. Author Saša Jurić introduces this powerful language using examples that highlight the benefits of Elixir\'s functional and concurrent programming. You\'ll discover how the OTP framework can radically reduce tedious low-level coding tasks. You\'ll also explore practical approaches to concurrency as you learn to distribute a production system over multiple machines.'
    //   },
    //   {
    //     isbn: '1680506617',
    //     title: 'Designing Elixir Systems With OTP',
    //     authors: ['James Gray', 'Bruce Tate'],
    //     published: new Date(2019, 12, 10),
    //     subtitle: 'Write Highly Scalable, Self-healing Software with Layers',
    //     rating: 4,
    //     thumbnails: [
    //       {
    //         url: 'https://images-na.ssl-images-amazon.com/images/I/41qnOSoPY2L._SX404_BO1,204,203,200_.jpg',
    //         title: 'cover'
    //       },
    //       {
    //         url: 'https://images-na.ssl-images-amazon.com/images/I/71pAhbiYX5L.jpg',
    //         title: 'cover2'
    //       },
    //     ],
    //     description: 'You know how to code in Elixir; now learn to think in it. Learn to design libraries with intelligent layers that shape the right data structures, flow from one function into the next, and present the right APIs. Embrace the same OTP that\'s kept our telephone systems reliable and fast for over 30 years. Move beyond understanding the OTP functions to knowing what\'s happening under the hood, and why that matters. Using that knowledge, instinctively know how to design systems that deliver fast and resilient services to your users, all with an Elixir focus. Elixir is gaining mindshare as the programming language you can use to keep you software running forever, even in the face of unexpected errors and an ever growing need to use more processors. This power comes from an effective programming language, an excellent foundation for concurrency and its inheritance of a battle-tested framework called the OTP. If you\'re using frameworks like Phoenix or Nerves, you\'re already experiencing the features that make Elixir an excellent language for today\'s demands. This book shows you how to go beyond simple programming to designing, and that means building the right layers. Embrace those data structures that work best in functional programs and use them to build functions that perform and compose well, layer by layer, across processes. Test your code at the right place using the right techniques. Layer your code into pieces that are easy to understand and heal themselves when errors strike. Of all Elixir\'s boons, the most important one is that it guides us to design our programs in a way to most benefit from the architecture that they run on. The experts do it and now you can learn to design programs that do the same.'
    //   },
    // ];
  }

  getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(booksRaw =>
        booksRaw.map(BookFactory.fromRaw)
      )
    );
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books`
    ).pipe(
      retry(3),
      map(booksRaw =>
        booksRaw.map(BookFactory.fromRaw)
      ),
      catchError(this.errorHandler)
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(
      `${this.api}/book/${isbn}`
    ).pipe(
      retry(3),
      map(BookFactory.fromRaw),
      catchError(this.errorHandler)
    );
  }

  remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, { responseType: 'text' });
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    return throwError(error);
  }
}
