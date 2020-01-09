import { BookRaw } from './book-raw';
import { Book } from './book';

export abstract class BookFactory {
  static fromRaw(raw: BookRaw): Book {
    return { ...raw, published: new Date(raw.published) };
  }
}
