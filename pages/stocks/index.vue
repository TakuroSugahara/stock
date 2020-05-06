<template>
  <div>
    <StockHeader
      :stock-repository="stockRepository"
      :category-repository="categoryRepository"
      @change-category="changeCategory"
    />
    <StockCardList
      class="mt-4"
      :stocks="stockRepository.items"
      :more-loading="stockRepository.loading"
      @more="next"
      @show-detail="openStockPage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { Stock } from '@/models/stock'
import { Category } from '@/models/category'

import { StockRepository } from '@/repositories/stock.repository'
import { CategoryRepository } from '@/repositories/category.repository'

import StockCardList from '@/components/molecules/StockCardList.vue'
import StockHeader from '@/components/molecules/StockHeader.vue'

@Component({
  components: {
    StockCardList,
    StockHeader
  }
})
export default class StockPage extends Vue {
  stocks: Stock[] = []
  stockRepository: StockRepository = new StockRepository()
  categoryRepository: CategoryRepository = new CategoryRepository()

  async created() {
    const categoryName = this.getCategory()
    await this.init(categoryName)
  }

  private getCategory(): string {
    if (this.$route.query.category) {
      return String(this.$route.query.category)
    }
    return this.stockRepository.defaultCategory
  }

  private async init(categoryName: string): Promise<void> {
    this.stockRepository.setCategory(categoryName)
    await Promise.all([
      this.stockRepository.init(),
      this.categoryRepository.findAll()
    ])
    this.categoryRepository.setCategory(categoryName)
  }

  next() {
    this.stockRepository.next()
  }

  openStockPage(stock: Stock) {
    open(stock.affiliateLink, '_blank')
  }

  changeCategory(category: Category) {
    this.stockRepository.setCategory(category.name)
    this.stockRepository.init()
    this.$router.push(`/stocks?category=${category.name}`)
  }
}
</script>
