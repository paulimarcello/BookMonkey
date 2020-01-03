import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute} from '@angular/router';
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
    private bookStoreService: BookStoreService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => this.book = this.bookStoreService.getByIsbn(paramMap.get('isbn'))
    );
  }

  getRating(rating: number) {
    return new Array(rating);
  }
}
