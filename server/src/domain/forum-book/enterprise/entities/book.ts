import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BookProps {
  title: string
  authors: string[]
  categories: string[]
  pagesCount: number
  createdAt: Date
  coverUrlSmall: string
  coverUrlMedium: string
}

export class Book extends Entity<BookProps> {
  get title() {
    return this.props.title
  }

  get authors() {
    return this.props.authors
  }

  get categories() {
    return this.props.categories
  }

  get pagesCount() {
    return this.props.pagesCount
  }

  get createdAt() {
    return this.props.createdAt
  }

  get coverUrlSmall() {
    return this.props.coverUrlSmall
  }

  get coverUrlMedium() {
    return this.props.coverUrlMedium
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
