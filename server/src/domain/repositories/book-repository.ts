import { Book } from "../entities/book";

export interface BookRepository {
  create(book: Book):Promise<void>
}