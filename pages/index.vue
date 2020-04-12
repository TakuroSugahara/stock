<template>
  <v-layout column justify-center align-center>
    <v-flex v-for="(stock, i) in stockRopository.items" :key="i" xs12 sm8 md6>
      <StockCard :stock="stock" class="mb-3" />
    </v-flex>
    <v-btn
      color="accent"
      :disabled="!stockRopository.canMore"
      text
      :loading="stockRopository.loading"
      @click="next"
    >
      {{ stockRopository.canMore ? 'もっと見る' : '全件表示されました' }}
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import { StockRepository } from '@/repositories/stock.repository'

import StockCard from '@/components/StockCard.vue'

@Component({
  components: {
    StockCard
  }
})
export default class TemplatePage extends Vue {
  stocks: Stock[] = []
  stockRopository: StockRepository = new StockRepository()

  async created() {
    await this.stockRopository.init()
  }

  next() {
    this.stockRopository.next()
  }
}
</script>
