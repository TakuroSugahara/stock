import { Stock } from '@/models/stock'
import contentful from '@/plugins/contentful'
import { CategoryEnum } from '@/enum/category.enum'
import { StockOrderEnum } from '@/enum/stockOrder.enum'

export class StockRepository {
  items: Stock[] = []
  category: CategoryEnum = CategoryEnum.MASK
  tags: string[] = []
  total: number = 0
  hits: number = 0
  order: StockOrderEnum = StockOrderEnum.PRICE
  loading: boolean = false

  constructor() {
    this.items = []
  }

  setCategory(category: CategoryEnum) {
    this.category = category
  }

  setOrder(order: StockOrderEnum) {
    this.order = order
  }

  selectTag(tag: string) {
    if (this.containTag(tag)) {
      this.popTag(tag)
      return
    }
    this.addTag(tag)
  }

  resetTags() {
    this.tags = []
  }

  private popTag(tag: string) {
    const index = this.tags.findIndex((t) => t === tag)
    this.tags.splice(index, 1)
  }

  private addTag(tag: string) {
    this.tags.push(tag)
  }

  private containTag(tag: string): boolean {
    return this.tags.some((t) => t === tag)
  }

  private get LIMIT(): number {
    return 20
  }

  private get skip(): number {
    return this.items.length
  }

  get canMore(): boolean {
    return this.items.length < this.total
  }

  private get orderField(): string {
    if (this.order === StockOrderEnum.AMOUNT) {
      return `-fields.${this.order}`
    }
    return `fields.${this.order}`
  }

  private get tagsField(): string {
    return this.tags.reduce((pre, cur) => {
      if (pre) {
        return `${pre},${cur}`
      }
      return cur
    }, '')
  }

  private get CONTENT_TYPE(): string {
    return 'stock'
  }

  private createStockInstance(data: any) {
    return new Stock({
      id: data.sys.id,
      createdAt: data.sys.createdAt,
      updatedAt: data.sys.updatedAt,
      title: data.fields.title,
      price: data.fields.price,
      amount: data.fields.amount,
      deliveryDate: data.fields.deliveryDate,
      image: data.fields.image,
      platform: data.fields.platform,
      shopName: data.fields.shopName,
      affiliateLink: data.fields.affiliateLink,
      category: data.fields.category,
      tags: data.fields.tags
    })
  }

  private setPaginationInfo(data: { items: Stock[]; total: number }) {
    this.total = data.total
    this.hits = data.items.length
  }

  private get findParams() {
    const params: any = {
      limit: this.LIMIT,
      skip: this.skip,
      content_type: this.CONTENT_TYPE,
      order: this.orderField,
      'fields.category': this.category
    }
    if (this.tags.length) {
      params['fields.tags[in]'] = this.tagsField
    }
    return params
  }

  /**
   * 現在の条件でStockの一覧を返す
   */
  private async find(): Promise<Stock[]> {
    const data = await contentful.getEntries(this.findParams)
    const stocks = data.items.map((item: any) => {
      return this.createStockInstance(item)
    })
    this.setPaginationInfo({ items: stocks, total: data.total })
    return stocks
  }

  /**
   * 最初の一覧
   */
  async init(): Promise<Stock[]> {
    this.loading = true
    this.items = []
    const items = await this.find()
    this.items = this.items.concat(items)
    this.loading = false
    return items
  }

  /**
   * 次の一覧
   */
  async next(): Promise<Stock[]> {
    if (!this.canMore) {
      return []
    }
    this.loading = true
    const items = await this.find()
    this.items = this.items.concat(items)
    this.loading = false
    return items
  }
}
