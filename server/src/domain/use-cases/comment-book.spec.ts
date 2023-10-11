import { expect, test } from 'vitest'
import { CommentBookUseCase } from './comment-book'
import { CommentRepository } from '../repositories/comment-repository'
import { Comment } from '../entities/comment'

const fakeCommentRepository: CommentRepository = {
  create: async (comment: Comment) => {
    return 
  }
}

test('Comment a book',
  async () => {
    const commentBook = new CommentBookUseCase(fakeCommentRepository)

    const {comment} = await commentBook.execute({
      assessment: 5,
      bookId: 'book-id',
      comment: 'Comment of book',
      readerId: 'reader-id'
    })

    expect(comment).toEqual('Comment of book')
  })