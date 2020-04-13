<template>
  <div>
    <v-select
      :items="categories"
      class="mt-3"
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
        <h1 class="subtitle-1 font-weight-bold">
          {{ stockRepository.category }}を探す
        </h1>
        <v-spacer></v-spacer>
        <span class="title">
          {{ stockRepository.total }}
        </span>
        <span style="font-size: 12px; padding-top: 6px">件</span>
        <v-select
          :items="orders"
          :value="orders[0]"
          label="並び替え"
          solo
          class="ml-2"
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
      <v-card-actions class="mt-4 px-0">
        <v-chip
          v-for="(tag, i) in displayTags"
          :key="i"
          class="mr-2"
          :outlined="!tag.selected"
          label
          color="accent"
          @click="selectTag(tag.name)"
        >
          # {{ tag.name }}
        </v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StockRepository } from '@/repositories/stock.repository'
import { findTags, Tag } from '@/enum/tag.enum'
import { CATEGORIES, CategoryEnum } from '@/enum/category.enum'
import {
  STOCK_ORDERS,
  STOCK_ORDER,
  StockOrderEnum
} from '@/enum/stockOrder.enum'

@Component
export default class StockHeader extends Vue {
  @Prop({ required: true })
  stockRepository!: StockRepository

  tags: Tag[] = findTags(CategoryEnum.MASK)

  get displayTags() {
    return this.tags.map((t) => {
      const selected = this.stockRepository.containTag(t.name)
      return Object.assign(t, { selected })
    })
  }

  get categories(): CategoryEnum[] {
    return CATEGORIES.map((c) => c.name)
  }

  selectCategory(category: CategoryEnum) {
    this.stockRepository.setCategory(category)
    this.stockRepository.resetTags()
    this.tags = findTags(category)
    this.stockRepository.init()
    this.$router.push(`/stocks?category=${category}`)
  }

  get orders(): STOCK_ORDER[] {
    return STOCK_ORDERS
  }

  selectOrders(order: StockOrderEnum) {
    this.stockRepository.setOrder(order)
    this.stockRepository.init()
  }

  selectTag(tagName: string) {
    this.stockRepository.selectTag(tagName)
    this.stockRepository.init()
  }
}
</script>
