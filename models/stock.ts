import { BaseEntity } from './baseEntity'
import { CategoryEnum } from '~/enum/cateogory.enum'
import { PlatformEnum } from '~/enum/platform.enum'

// - タイトル
// - 最終的な価格
// - 全体の量
// - 配送日
// - 画像
// - 参照サイト
// - プラットフォーム
// - 店舗名
// - アフィリリンク
// - アフィリエイトリンク先
// - カテゴリ(マスク・アルコールジェル・アルコールスプレー)
// - タグ
export class Stock extends BaseEntity<Stock> {
  title: string
  price: number
  amount: number
  deliveryDate: Date
  image: string
  platform: PlatformEnum
  shopName: string
  afterLink: string
  category: CategoryEnum
  tags: string[]

  constructor(data: any) {
    super()
    this.title = data.title
    this.price = data.price
    this.amount = data.amount
    this.deliveryDate = data.deliveryDate
    this.image = data.image
    this.platform = data.platform
    this.shopName = data.shopName
    this.afterLink = data.afterLink
    this.category = data.category
    this.tags = data.tags || []
  }

  // TODO: プラットフォームでアフィリエイトタグを変更したURLを生成
}
