import { BaseEntity } from './baseEntity'
import { CategoryEnum } from '@/enum/category.enum'
import { Tag } from '@/enum/tag.enum'

export class Category extends BaseEntity<Category> {
  name: CategoryEnum
  tags: Tag[]

  constructor(data: any) {
    super()
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.name = data.name
    this.tags = data.tags || []
  }

  sameName(categoryName: CategoryEnum): boolean {
    return this.name === categoryName
  }
}
