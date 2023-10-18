import { ReaderRepository } from '@/domain/forum-book/application/repositories/reader-repository'
import { Reader } from '@/domain/forum-book/enterprise/entities/reader'

export class InMemoryReaderRepository implements ReaderRepository {
  public items: Reader[] = []

  async create(reader: Reader) {
    this.items.push(reader)
    return reader
  }

  async findById(readerId: string) {
    const reader = this.items.find((item) => item.id.toString() === readerId)
    if (!reader) {
      return null
    }
    return reader
  }
}
