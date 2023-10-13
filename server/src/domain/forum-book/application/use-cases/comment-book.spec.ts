import { RatingRepository } from '../repositories/comment-repository'
import { CommentBookUseCase } from './comment-book'

const fakeCommentRepository: RatingRepository = {
  create: async () => {
    return
  },
}

test('Rating a book', async () => {
  const commentBook = new CommentBookUseCase(fakeCommentRepository)

  const { rating } = await commentBook.execute({
    assessment: 5,
    bookId: 'book-id',
    comment: 'Rating of book',
    readerId: 'reader-id',
  })

  expect(rating.comment).toEqual('Rating of book')
})
