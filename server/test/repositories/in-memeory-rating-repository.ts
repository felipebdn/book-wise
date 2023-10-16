import { PaginationParams } from '@/core/repositories/pagination-params'
import { RatingRepository } from '@/domain/forum-book/application/repositories/rating-repository'
import { Rating } from '@/domain/forum-book/enterprise/entities/rating'

interface BookRating {
  totalAssessment: number
  count: number
}

export class InMemoryRatingRepository implements RatingRepository {
  public items: Rating[] = []

  async getLastByReaderId(readerId: string) {
    const ratigns = this.items
      .filter((item) => item.readerId.toString() === readerId)
      .sort((a, b) => b.createdAt.getDate() - a.createdAt.getDate())

    return ratigns[0]
  }

  async getBestMediaRate() {
    const bookRatings: { [key: string]: BookRating } = {}

    this.items.forEach(({ bookId, assessment }) => {
      if (bookRatings[bookId.toString()]) {
        bookRatings[bookId.toString()].totalAssessment += assessment
        bookRatings[bookId.toString()].count++
      } else {
        bookRatings[bookId.toString()] = {
          totalAssessment: assessment,
          count: 1,
        }
      }
    })

    const sortedBooks = Object.keys(bookRatings).map((bookId: string) => ({
      bookId,
      averageAssessment: Math.round(
        bookRatings[bookId].totalAssessment / bookRatings[bookId].count,
      ),
    }))

    sortedBooks.sort((a, b) => b.averageAssessment - a.averageAssessment)

    return sortedBooks
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
