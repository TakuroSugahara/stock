import contentful from '@/plugins/contentful'
import { Category } from '@/models/category'
import { CategoryEnum } from '@/enum/category.enum'
import { Tag } from '@/enum/tag.enum'

export class CategoryRepository {
  items: Category[] = []
  category: Category | null = null
  tags: Tag[] = []
  loading: boolean = false

  constructor() {
    this.items = []
    this.tags = []
    this.loading = false
  }

  private createStockInstance(data: any) {
    return new Category({
      id: data.sys.id,
      createdAt: data.sys.createdAt,
      updatedAt: data.sys.updatedAt,
      name: data.fields.name,
      tags: data.fields.tags
        ? data.fields.tags.map((t: string) => {
            return {
              category: data.fields.name,
              name: t
            }
          })
        : []
    })
  }

  private get CONTENT_TYPE(): string {
    return 'category'
  }

  private get findParams() {
    return {
      content_type: this.CONTENT_TYPE
    }
  }

  async findAll(): Promise<Category[]> {
    this.loading = true
    this.items = []
    const data = await contentful.getEntries(this.findParams)
    const categories = data.items.map((item: any) => {
      return this.createStockInstance(item)
    })
    this.items = categories
    this.loading = false
    return categories
  }

  getByCategory(category: CategoryEnum): Category {
    this.category = this.items.find((item) => item.sameName(category))!
    this.tags = this.category ? this.category.tags : []
    return this.category
  }
}
