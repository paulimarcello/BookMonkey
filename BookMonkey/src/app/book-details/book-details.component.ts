import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookStoreService: BookStoreService
  ) {
  }

  ngOnInit() {
    this.isbnAusRouteAuslesen(this.route,
      (isbn) => this.ladeBuch(isbn,
        (book) => this.book = book));
  }

  private isbnAusRouteAuslesen(route: ActivatedRoute, callback: (isbn: string) => void): void {
    route.paramMap.subscribe(paramMap => callback(paramMap.get('isbn')));
  }

  private ladeBuch(isbn: string, callback: (book: Book) => void): void {
    this.bookStoreService
      .getSingle(isbn)
      .subscribe(callback);
  }

  getRating(rating: number) {
    return new Array(rating);
  }

  removeBook(): void {
    if (confirm('Buch wirklich löschen?')) {
      this.bookStoreService
        .remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['/books']));
    }
  }
}
