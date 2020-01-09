import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';
import { map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private route$: ActivatedRoute,
    private router: Router,
    private bookStoreService: BookStoreService
  ) {
  }

  ngOnInit() {
    this.route$.paramMap
    .pipe(
      map(paramMap => paramMap.get('isbn')),
      concatMap(isbn => this.bookStoreService.getSingle(isbn))
    )
    .subscribe(book => this.book = book);
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
