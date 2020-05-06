<template>
  <div class="primary--text">
    <TopHeader
      class="mt-5"
      :categories="categoryRepository.items"
      @click-category="goToStocks"
    />
    <StockCardList
      class="mt-4"
      :stocks="stockRepository.items"
      :init-loading="stockRepository.loading"
      :more-loading="stockRepository.loading"
      @more="goToDefaultStock"
      @show-detail="openStockPage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import { StockRepository } from '@/repositories/stock.repository'
import { CategoryRepository } from '@/repositories/category.repository'
import StockCardList from '@/components/molecules/StockCardList.vue'
import TopHeader from '@/components/molecules/TopHeader.vue'
import { Category } from '@/models/category'

@Component({
  components: {
    TopHeader,
    StockCardList
  }
})
export default class TemplatePage extends Vue {
  stockRepository: StockRepository = new StockRepository()
  categoryRepository: CategoryRepository = new CategoryRepository()

  created() {
    this.stockRepository.init()
    this.categoryRepository.findAll()
  }

  goToStocks(category: Category) {
    this.$router.push(`/stocks?category=${category.name}`)
  }

  goToDefaultStock() {
    this.$router.push(
      `/stocks?category=${this.stockRepository.defaultCategory}`
    )
  }

  openStockPage(stock: Stock) {
    open(stock.affiliateLink, '_blank')
  }
}
</script>
