<template>
  <div>
    <v-row>
      <v-col
        v-for="(stock, i) in stockRopository.items"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <StockCard :stock="stock" class="mb-3" />
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
        color="accent"
        :disabled="!stockRopository.canMore"
        text
        :loading="stockRopository.loading"
        @click="next"
      >
        {{ stockRopository.canMore ? 'もっと見る' : '全件表示されました' }}
      </v-btn>
    </div>
  </div>
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
