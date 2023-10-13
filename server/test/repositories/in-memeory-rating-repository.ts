import { RatingRepository } from '@/domain/forum-book/application/repositories/rating-repository'
import { Rating } from '@/domain/forum-book/enterprise/entities/rating'

export class InMemoryRatingRepository implements RatingRepository {
  public items: Rating[] = []

  async findById(ratingId: string) {
    const rating = this.items.find((item) => item.id.toString() === ratingId)
    if (!rating) {
      return null
    }
    return rating
  }

  async findByBookId(bookId: string) {
    const ratigns = this.items.filter(
      (item) => item.bookId.toString() === bookId,
    )
    return ratigns
  }

  async save(rating: Rating) {
    const itemIndex = this.items.findIndex((item) => item.id === rating.id)
    this.items[itemIndex] = rating
    return rating
  }

  async create(rating: Rating) {
    this.items.push(rating)
    return rating
  }

  async delete(rating: Rating) {
    const itemIndex = this.items.findIndex((item) => item.id === rating.id)
    this.items.splice(itemIndex, 1)
  }
}
