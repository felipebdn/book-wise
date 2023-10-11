import { expect, test } from 'vitest'
import { TextComment } from './comment'

test('resume text of comment', async () => {
  const comment = TextComment.createFromText('Teste')

  expect(comment.value).toEqual('Teste')
})
