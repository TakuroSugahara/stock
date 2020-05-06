import { BaseEntity } from './baseEntity'
import { Tag } from '@/enum/tag.enum'

export class Category extends BaseEntity<Category> {
  name: string
  tags: Tag[]

  constructor(data: any) {
    super()
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.name = data.name
    this.tags = data.tags || []
  }

  sameName(categoryName: string): boolean {
    return this.name === categoryName
  }
}
