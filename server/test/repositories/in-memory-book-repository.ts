import { BookRepository } from '@/domain/forum-book/application/repositories/book-repository'
import { Book } from '@/domain/forum-book/enterprise/entities/book'

export class InMemoryBookRepository implements BookRepository {
  public items: Book[] = []

  async create(book: Book) {
    this.items.push(book)
  }
}
