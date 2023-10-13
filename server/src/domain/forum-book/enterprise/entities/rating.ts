import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface RatingProps {
  bookId: UniqueEntityID
  readerId: UniqueEntityID
  comment: string
  assessment: number
  createdAt: Date
  updatedAt?: Date
}

export class Rating extends Entity<RatingProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get bookId() {
    return this.props.bookId
  }

  get readerId() {
    return this.props.readerId
  }

  get comment() {
    return this.props.comment
  }

  set comment(comment: string) {
    this.props.comment = comment
    this.touch()
  }

  get assessment() {
    return this.props.assessment
  }

  set assessment(assessment: number) {
    this.props.assessment = assessment
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.comment.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<RatingProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const rating = new Rating(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return rating
  }
}
