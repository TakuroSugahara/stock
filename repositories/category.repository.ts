import contentful from '@/plugins/contentful'
import { Category } from '@/models/category'

export class CategoryRepository {
  items: Category[] = []
  category: Category | null = null
  loading: boolean = false

  constructor() {
    this.items = []
    this.loading = false
  }

  private createStockInstance(data: any) {
    const tags = data.fields.tags
      ? data.fields.tags.map((t: string) => {
          return {
            category: data.fields.name,
            name: t
          }
        })
      : []
    return new Category(
      data.sys.id,
      data.sys.createdAt,
      data.sys.updatedAt,
      data.fields.name,
      tags
    )
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

  setCategory(categoryName: string) {
    this.category = this.items.find((item) => item.sameName(categoryName))!
  }
}
