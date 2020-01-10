import { Component, OnInit, Input } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookStoreService: BookStoreService, private router: Router) { }

  ngOnInit() {
  }

  createBook(book: Book): void {
    this.bookStoreService.create(book)
    .subscribe(() => this.router.navigateByUrl('/books'));
  }
}
