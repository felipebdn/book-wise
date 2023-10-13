import { Book } from '../../enterprise/entities/book'

export interface BookRepository {
  create(book: Book): Promise<Book>
  findById(bookId: string): Promise<Book | null>
}
