<template>
  <div>
    <v-row v-if="!initLoading">
      <v-col
        v-for="(stock, i) in stocks"
        :key="i"
        cols="12"
        sm="6"
        class="py-1"
      >
        <StockCard :stock="stock" @show-detail="showDetail" />
      </v-col>
    </v-row>
    <div class="mt-3 text-center">
      <v-btn
        outlined
        color="scondary"
        :loading="moreLoading"
        @click="clickMore"
      >
        続きを見る
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { Stock } from '@/models/stock'
import StockCard from '@/components/molecules/StockCard.vue'

@Component({
  components: {
    StockCard
  }
})
export default class StockCardList extends Vue {
  @Prop({ default: [] })
  stocks!: Stock[]

  @Prop({ default: false })
  moreLoading: boolean

  @Prop({ default: false })
  initLoading: boolean

  @Emit('more')
  clickMore() {}

  @Emit('show-detail')
  showDetail(stock: Stock): Stock {
    return stock
  }
}
</script>
