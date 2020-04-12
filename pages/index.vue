<template>
  <div>
    <StockHeader :stock-repository="stockRepository" />
    <v-row>
      <v-col
        v-for="(stock, i) in stockRepository.items"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="py-1"
      >
        <StockCard :stock="stock" />
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
        color="accent"
        :disabled="!stockRepository.canMore"
        text
        :loading="stockRepository.loading"
        @click="next"
      >
        {{ stockRepository.canMore ? 'もっと見る' : '全件表示されました' }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import { StockRepository } from '@/repositories/stock.repository'

import StockCard from '@/components/StockCard.vue'
import StockHeader from '@/components/StockHeader.vue'

@Component({
  components: {
    StockCard,
    StockHeader
  }
})
export default class TemplatePage extends Vue {
  stocks: Stock[] = []
  stockRepository: StockRepository = new StockRepository()

  async created() {
    await this.stockRepository.init()
  }

  next() {
    this.stockRepository.next()
  }
}
</script>
