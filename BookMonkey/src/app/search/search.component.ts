import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyUp$ = new Subject<string>();
  isLoading = false;
  foundBooks: Book[] = [];

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.keyUp$
    .pipe(
      debounceTime(500),
      distinctUntilChanged(), //nur abschicken, wenn sich neuer searchTerm vom alten unterscheidet
      filter(searchTerm => searchTerm.length > 3),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bookStoreService.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
    .subscribe(books => this.foundBooks = books);
  }
}
