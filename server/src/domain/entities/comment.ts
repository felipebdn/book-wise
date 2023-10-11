import { TextComment } from "./value-objects/comment"
import { Entity } from "../../core/entities/entity"

interface CommentProps {
  comment:string
  assessment: number
  readerId: string
  bookId: string
  createdAt?:Date
}

export class Comment extends Entity<CommentProps> {
  get comment(){
    return this.props.comment
  }
  
}