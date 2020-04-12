<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      hoge
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import { StockRepository } from '@/repositories/stock.repository'

@Component
export default class TemplatePage extends Vue {
  stocks: Stock[] = []
  stockRopository: StockRepository = new StockRepository()

  async created() {
    await this.stockRopository.init()
  }
}
</script>
