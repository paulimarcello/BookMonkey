import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BookFactory } from '../shared/book-factory';
import { Book, Thumbnail } from '../shared/book';
import { NgForm, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Output() submitBook = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    if (this.bookForm) { return; }

    this.bookForm =
      this.fb.group({
        title: ['', Validators.required],
        subtitle: [''],
        isbn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
        published: [],
        authors: this.buildAuthorsArray(['']),
        description: [''],
        thumbnails: this.buildThumbnailsArray([{title: '', url: ''}])
      });
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(values.map(v => this.fb.group(v)));
  }

  addAuthorControl(): void {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl(): void {
    this.thumbnails.push(
      this.fb.group({url: '', title: ''})
    );
  }

  get authors(): FormArray {
    //                                  .- type assertion - Typprüfung wird hier komplett ausgeschaltet. "Compiler, ich weiss es besser"
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  speichern(): void {
    const formValue = this.bookForm.value;
    const authors = formValue.authors.filter(author => author);
    const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);

    const newBook: Book = {
      ...formValue,
      authors,
      thumbnails
    };

    this.submitBook.emit(newBook);

    this.bookForm.reset();
  }
}
