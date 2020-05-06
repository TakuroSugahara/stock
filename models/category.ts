import { BaseEntity } from './baseEntity'
import { Tag } from '@/enum/tag.enum'

export class Category extends BaseEntity<Category> {
  name: string
  tags: Tag[]

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    tags: Tag[] = []
  ) {
    super()
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.name = name
    this.tags = tags
  }

  sameName(categoryName: string): boolean {
    return this.name === categoryName
  }
}
