import { Book } from '../../enterprise/entities/book'

export interface BookRepository {
  create(book: Book): Promise<void>
}
