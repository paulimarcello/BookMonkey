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
  private api = 'https://api3.angular-buch.com/secure';

  books: Book[];

  constructor(private http: HttpClient) { }

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

  create(book: Book): Observable<any> {
    return this.http.post(
      `${this.api}/book`,
      book,
      { responseType: 'text' }
    ).pipe(
      retry(3),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    return throwError(error);
  }
}
