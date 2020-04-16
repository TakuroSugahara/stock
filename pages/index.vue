<template>
  <div class="primary--text">
    <h1 class="mt-5 subtitle-1 font-weight-bold">在庫ナビについて</h1>
    <p style="font-size: 13px">
      在庫ナビは、不足品となっているマスクやアルコール<br />
      ジェルなどを手軽に探せるサービスです。<br />
      価格順、数量順、配送日順で並び替えることができるので、<br />
      ベストな商品を探すことができます！
    </p>
    <h2 class="mt-5 subtitle-1 font-weight-bold">商品を選択する</h2>
    <v-row class="mx-auto">
      <v-col
        v-for="(category, i) in categories"
        :key="i"
        cols="6"
        sm="6"
        md="3"
        class="pl-0 pr-3 pb-0"
      >
        <v-btn
          outlined
          class="primary--text white body-2 top_category"
          height="64"
          width="170"
          style="border-color: #009688 !important"
          :to="`/stocks?category=${category.name}`"
        >
          <img :src="category.icon" :alt="category.name" width="28" />
          <div v-if="category.name === 'アルコールティッシュ'" class="ml-2">
            アルコール<br />
            ティッシュ
          </div>
          <div v-else>
            {{ category.name }}
          </div>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!stockRepository.loading" class="mt-4">
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
    <div class="mt-3 text-center">
      <v-btn
        outlined
        color="accent"
        :loading="stockRepository.loading"
        to="/stocks?category=マスク"
      >
        続きを見る
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES } from '@/enum/category.enum'
import { StockRepository } from '@/repositories/stock.repository'
import StockCard from '@/components/StockCard.vue'

@Component({
  components: {
    StockCard
  }
})
export default class TemplatePage extends Vue {
  stockRepository: StockRepository = new StockRepository()

  get categories() {
    return CATEGORIES
  }

  created() {
    this.stockRepository.list()
  }
}
</script>
