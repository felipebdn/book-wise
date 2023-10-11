import { Entity } from "../../core/entities/entity"

interface BookProps {
  title:string
  author: string
  assessment: string
  categories: string[]
  pages: number
  cover: string
}

export class Book extends Entity<BookProps> {

  
}
