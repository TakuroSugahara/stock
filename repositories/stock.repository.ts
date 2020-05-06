import { Stock } from '@/models/stock'
import { api } from '@/plugins/api'

export class StockRepository {
  items: Stock[] = []
  category: string = ''
  total: number = 0
  hits: number = 0
  page: number = 1
  loading: boolean = false

  constructor() {
    this.items = []
    this.page = 1
    this.total = 0
    this.hits = 0
    this.category = this.defaultCategory
    this.loading = false
  }

  get defaultCategory(): string {
    return 'マスク'
  }

  setCategory(category: string) {
    this.category = category
  }

  setPage(page: number) {
    this.page = page
  }

  get canMore(): boolean {
    return this.items.length < this.total
  }

  private createStockInstance(data: any) {
    return new Stock({
      id: data.id,
      title: data.title,
      price: data.price,
      deliveryDate: data.deliveryDate,
      image: data.image,
      platform: data.platform,
      shopName: data.shopName,
      affiliateLink: data.affiliateLink,
      category: data.category
    })
  }

  private setPaginationInfo(data: { hits: number; total: number }) {
    this.total = data.total
    this.hits = data.hits
  }

  /**
   * 現在の条件でStockの一覧を返す
   */
  private async find(): Promise<Stock[]> {
    const { data } = await api.get(
      `/stocks?category=${this.category}&page=${this.page}`
    )
    const stocks = data.items.map((item: any) => {
      return this.createStockInstance(item)
    })
    this.setPaginationInfo({ hits: data.hits, total: data.total })
    return stocks
  }

  /**
   * 最初の一覧
   */
  async init(): Promise<Stock[]> {
    this.loading = true
    this.items = []
    this.setPage(1)
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
    this.setPage(this.page + 1)
    const items = await this.find()
    this.items = this.items.concat(items)
    this.loading = false
    return items
  }
}
