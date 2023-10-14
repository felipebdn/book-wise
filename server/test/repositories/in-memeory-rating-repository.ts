import { PaginationParams } from '@/core/repositories/pagination-params'
import { RatingRepository } from '@/domain/forum-book/application/repositories/rating-repository'
import { Rating } from '@/domain/forum-book/enterprise/entities/rating'

export class InMemoryRatingRepository implements RatingRepository {
  public items: Rating[] = []

  async findManyBestRate(params: PaginationParams) {
    console.log(params)

    const bestRate = this.items.sort((a, b) => b.assessment - a.assessment)

    return bestRate
  }

  async findMany({ amount, page }: PaginationParams) {
    const ratigns = this.items
      .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
      .slice((page - 1) * amount, page * amount)

    return ratigns
  }

  async findManyByBookId(bookId: string, { page, amount }: PaginationParams) {
    const ratigns = this.items
      .filter((item) => item.bookId.toString() === bookId)
      .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())
      .slice((page - 1) * amount, page * amount)

    /**
     * @example
     * page = 1
     * amount = 20
     * .slice((page - 1) * amount, page * amount) retorn first 20 ratings of list.
     *
     */
    return ratigns
  }

  async findById(ratingId: string) {
    const rating = this.items.find((item) => item.id.toString() === ratingId)
    if (!rating) {
      return null
    }
    return rating
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
