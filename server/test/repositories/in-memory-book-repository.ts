import { BookRepository } from '@/domain/forum-book/application/repositories/book-repository'
import { Book } from '@/domain/forum-book/enterprise/entities/book'

export class InMemoryBookRepository implements BookRepository {
  public items: Book[] = []

  async findManyById(bookId: string[]): Promise<Book[]> {
    throw new Error('Method not implemented.')
  }

  async findById(bookId: string) {
    const book = this.items.find((item) => item.id.toString() === bookId)
    if (!book) {
      return null
    }
    return book
  }

  async create(book: Book) {
    this.items.push(book)
    return book
  }
}
