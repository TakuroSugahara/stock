import { BaseEntity } from './baseEntity'
import { PlatformEnum, PlatformLogoEnum } from '@/enum/platform.enum'

export class Stock extends BaseEntity<Stock> {
  title: string
  price: number
  deliveryDate: Date | null
  image: string
  platform: PlatformEnum
  shopName: string
  affiliateLink: string
  category: string
  tags: string[]

  constructor(data: any) {
    super()
    this.id = data.id
    this.title = data.title
    this.price = data.price
    this.deliveryDate = data.deliveryDate
    this.image = data.image
    this.platform = data.platform
    this.shopName = data.shopName
    this.affiliateLink = data.affiliateLink
    this.category = data.category
    this.tags = data.tags || []
  }

  get platformLogo(): string {
    if (this.platform === PlatformEnum.RAKUTEN) {
      return PlatformLogoEnum.RAKUTEN
    }
    return PlatformLogoEnum.AMAZON
  }

  /**
   * 3桁ごとで,を入れて表示する
   */
  get displayPrice(): string {
    return Number(this.price).toLocaleString()
  }
}
