import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BookProps {
  title: string
  author: string[]
  categories: string[]
  pages: number
  createdAt: Date
  cover: string
}

export class Book extends Entity<BookProps> {
  get title() {
    return this.props.title
  }

  get author() {
    return this.props.author
  }

  get categories() {
    return this.props.categories
  }

  get pages() {
    return this.props.pages
  }

  get createdAt() {
    return this.props.createdAt
  }

  get cover() {
    return this.props.cover
  }

  static create(props: Optional<BookProps, 'createdAt'>, id?: UniqueEntityID) {
    const book = new Book(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return book
  }
}
