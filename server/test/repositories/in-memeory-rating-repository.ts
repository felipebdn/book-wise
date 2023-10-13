import { RatingRepository } from '@/domain/forum-book/application/repositories/rating-repository'
import { Rating } from '@/domain/forum-book/enterprise/entities/rating'

export class InMemoryRatingRepository implements RatingRepository {
  public items: Rating[] = []

  async create(rating: Rating) {
    this.items.push(rating)
  }

  async findByBookId(bookId: string) {
    const ratigns = this.items.filter(
      (item) => item.bookId.toString() === bookId,
    )
    return ratigns
  }
}
