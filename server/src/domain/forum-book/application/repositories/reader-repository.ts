import { Reader } from '../../enterprise/entities/reader'

export interface ReaderRepository {
  create(reader: Reader): Promise<Reader>
  findById(readerId: string): Promise<Reader | null>
}
