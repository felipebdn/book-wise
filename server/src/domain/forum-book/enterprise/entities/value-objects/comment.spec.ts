import { expect, test } from 'vitest'
import { TextComment } from './comment'

test('resume text of rating', async () => {
  const rating = TextComment.createFromText('Teste')

  expect(rating.value).toEqual('Teste')
})
