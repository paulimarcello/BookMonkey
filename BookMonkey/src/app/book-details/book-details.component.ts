import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;
  @Output() showListEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showList(): void {
    this.showListEvent.emit();
  }

  getRating(rating: number) {
    return new Array(rating);
  }
}
