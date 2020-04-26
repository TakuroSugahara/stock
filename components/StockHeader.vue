<template>
  <div id="stock_list">
    <v-select
      :items="categories"
      class="mt-3 filter_button"
      solo
      dense
      flat
      @change="selectCategory"
    >
      <template v-slot:label>
        <span class="caption primary--text">他の商品を探す</span>
      </template>
      <template v-slot:item="{ item }">
        <span class="list_categopry primary--text">{{ item }}</span>
      </template>
    </v-select>
    <v-card flat color="transparent">
      <v-card-actions class="primary--text px-0">
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
          <template v-slot:item="{ item }">
            <span class="caption sort">{{ item.text }}</span>
          </template>
        </v-select>
      </v-card-actions>
      <v-card-actions class="mt-4 px-0">
        <v-chip
          v-for="(tag, i) in displayTags"
          :key="i"
          class="mr-2 tag_type"
          :outlined="!tag.selected"
          label
          :color="tag.selected ? 'grey lighten-2' : 'grey darken-1'"
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
import { CategoryRepository } from '@/repositories/category.repository'
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

  @Prop({ required: true })
  categoryRepository!: CategoryRepository

  created() {
    const category: any = this.$route.query.category || CategoryEnum.MASK
  }

  get displayTags() {
    return this.categoryRepository.tags.map((t) => {
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
    this.stockRepository.init()
    this.categoryRepository.getByCategory(category)
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

<style lang="scss">
#stock_list {
  .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    border: 1px solid rgba(0, 0, 0, 0.54) !important;
  }
}
</style>
