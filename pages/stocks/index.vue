<template>
  <div>
    <StockHeader
      :stock-repository="stockRepository"
      :category-repository="categoryRepository"
    />
    <v-row class="mt-4">
      <v-col
        v-for="(stock, i) in stockRepository.items"
        :key="i"
        cols="12"
        sm="6"
        class="py-1"
      >
        <StockCard :stock="stock" />
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn text :loading="stockRepository.loading" @click="next">
        {{ stockRepository.canMore ? 'もっと見る' : '全件表示されました' }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import { StockRepository } from '@/repositories/stock.repository'
import { CategoryRepository } from '@/repositories/category.repository'

import StockCard from '@/components/StockCard.vue'
import StockHeader from '@/components/StockHeader.vue'

@Component({
  components: {
    StockCard,
    StockHeader
  }
})
export default class StockPage extends Vue {
  stocks: Stock[] = []
  stockRepository: StockRepository = new StockRepository()
  categoryRepository: CategoryRepository = new CategoryRepository()

  async created() {
    const category: any =
      this.$route.query.category || this.stockRepository.defaultCategory
    this.stockRepository.setCategory(category)
    await Promise.all([
      this.stockRepository.init(),
      this.categoryRepository.findAll()
    ])
    this.categoryRepository.getByCategory(category)
  }

  next() {
    this.stockRepository.next()
  }
}
</script>

<style>
#stocks {
  touch-action: manipulation;
}
</style>
