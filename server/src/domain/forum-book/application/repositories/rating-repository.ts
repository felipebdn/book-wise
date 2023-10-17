import { PaginationParams } from '@/core/repositories/pagination-params'
import { Rating } from '../../enterprise/entities/rating'

interface BookRating {
  bookId: string
  averageAssessment: number
}

export interface RatingRepository {
  findManyRatesById(
    booksIds: string[],
    readerId: string,
    params: PaginationParams,
  ): Promise<Rating[]>
  findManyByReaderId(
    readerId: string,
    params: PaginationParams,
  ): Promise<Rating[]>
  findById(ratingId: string): Promise<Rating | null>
  getLastByReaderId(readerId: string): Promise<Rating>
  findMany(params: PaginationParams): Promise<Rating[]>
  getBestMediaRate(): Promise<BookRating[]>
  findManyByBookId(bookId: string, params: PaginationParams): Promise<Rating[]>
  save(rating: Rating): Promise<Rating>
  create(rating: Rating): Promise<Rating>
  delete(rating: Rating): Promise<void>
}
