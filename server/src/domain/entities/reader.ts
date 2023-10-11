import { Entity } from "../../core/entities/entity"

interface ReaderProps {
  name:string
  createdAt: string
  cover: string
}

export class Reader extends Entity<ReaderProps> {
  
}