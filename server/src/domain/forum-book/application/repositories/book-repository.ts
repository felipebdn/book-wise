import { PaginationParams } from '@/core/repositories/pagination-params'
import { Book } from '../../enterprise/entities/book'

export interface BookRepository {
  create(book: Book): Promise<Book>
  findManyByCategory(category: string, props: PaginationParams): Promise<Book[]>
  findById(bookId: string): Promise<Book | null>
  findManyById(bookId: string[]): Promise<Book[]>
  findManyByQuery(query: string): Promise<Book[]>
}
