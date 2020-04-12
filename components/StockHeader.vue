<template>
  <div>
    <v-select
      :items="categories"
      class="mt-3 caption"
      solo
      dense
      flat
      @change="selectCategory"
    >
      <template v-slot:label>
        <span class="caption primary--text">他の商品を探す</span>
      </template>
    </v-select>
    <v-card flat color="transparent">
      <v-card-actions class="primary--text">
        <h1 class="title font-weight-bold">
          {{ stockRepository.category }}を探す
        </h1>
        <v-spacer></v-spacer>
        {{ stockRepository.total }}<span>件</span>
        <v-select
          :items="orders"
          :value="orders[0]"
          label="並び替え"
          solo
          class="ml-2 caption"
          dense
          hide-details
          flat
          style="max-width: 110px"
          @change="selectOrders"
        >
          <template v-slot:label>
            <span class="primary--text caption">並び替え</span>
          </template>
        </v-select>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StockRepository } from '@/repositories/stock.repository'
import { CATEGORIES, CategoryEnum } from '@/enum/category.enum'
import { STOCK_ORDERS, STOCK_ORDER } from '@/enum/stockOrder.enum'

@Component
export default class StockCard extends Vue {
  @Prop({ required: true })
  stockRepository!: StockRepository

  get categories(): CategoryEnum[] {
    return CATEGORIES
  }

  selectCategory(category: CategoryEnum) {
    this.stockRepository.setCategory(category)
    this.stockRepository.init()
  }

  get orders(): STOCK_ORDER[] {
    return STOCK_ORDERS
  }

  selectOrders(order: STOCK_ORDER) {
    this.stockRepository.setOrder(order.value)
    this.stockRepository.init()
  }
}
</script>
