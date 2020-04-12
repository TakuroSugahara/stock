import { Stock } from '@/models/stock'
import contentful from '@/plugins/contentful'
import { CategoryEnum } from '@/enum/category.enum'
import { StockOrderEnum } from '@/enum/stockOrder.enum'

export class StockRepository {
  items: Stock[] = []
  category: CategoryEnum = CategoryEnum.MASK
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

  private get LIMIT(): number {
    return 2
  }

  private get skip(): number {
    return this.items.length
  }

  get canMore(): boolean {
    return this.items.length < this.total
  }

  private orderField(): string {
    return `fields.${this.order}`
  }

  private categoryField(): string {
    return `fields.${this.category}`
  }

  private CONTENT_TYPE(): string {
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
      category: data.fields.category
    })
  }

  private setPaginationInfo(data: { items: Stock[]; total: number }) {
    this.total = data.total
    this.hits = data.items.length
  }

  private get findParams() {
    return {
      limit: this.LIMIT,
      skip: this.skip,
      content_type: this.CONTENT_TYPE,
      'fields.category,': this.categoryField,
      order: this.orderField
    }
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
    console.log(this)
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
