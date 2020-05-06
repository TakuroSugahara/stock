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

  constructor(
    id: string,
    title: string,
    price: number,
    deliveryDate: Date | null,
    image: string,
    platform: PlatformEnum,
    shopName: string,
    affiliateLink: string,
    category: string
  ) {
    super()
    this.id = id
    this.title = title
    this.price = price
    this.deliveryDate = deliveryDate
    this.image = image
    this.platform = platform
    this.shopName = shopName
    this.affiliateLink = affiliateLink
    this.category = category
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
