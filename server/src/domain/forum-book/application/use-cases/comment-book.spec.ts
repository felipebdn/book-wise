import { CommentRepository } from '../repositories/comment-repository'
import { CommentBookUseCase } from './comment-book'

const fakeCommentRepository: CommentRepository = {
  create: async () => {
    return
  },
}

test('Comment a book', async () => {
  const commentBook = new CommentBookUseCase(fakeCommentRepository)

  const { comment } = await commentBook.execute({
    assessment: 5,
    bookId: 'book-id',
    comment: 'Comment of book',
    readerId: 'reader-id',
  })

  expect(comment).toEqual('Comment of book')
})
