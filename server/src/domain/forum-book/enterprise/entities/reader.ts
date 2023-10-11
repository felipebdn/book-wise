import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface ReaderProps {
  name: string
  createdAt: Date
  updatedAt?: Date
  cover: string
}

export class Reader extends Entity<ReaderProps> {
  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get cover() {
    return this.props.cover
  }

  static create(
    props: Optional<ReaderProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const reader = new Reader(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return reader
  }
}
