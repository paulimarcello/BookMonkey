import { BookRaw } from './book-raw';
import { Book } from './book';

export abstract class BookFactory {
  static fromRaw(raw: BookRaw): Book {
    return { ...raw, published: new Date(raw.published) };
  }

  static empty(): Book {
    return {
      isbn: '',
      title: '',
      authors: [],
      published: new Date(),
      subtitle: '',
      rating: 0,
      thumbnails: [{
        url: '',
        title: ''
      }],
      description: ''
    };
  }
}
