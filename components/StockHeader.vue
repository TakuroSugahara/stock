<template>
  <div id="stock_list">
    <v-select
      :items="categoryRepository.items"
      class="mt-3 filter_button"
      solo
      dense
      flat
      item-text="name"
      return-object
      @change="selectCategory"
    >
      <template v-slot:label>
        <span class="caption primary--text">他の商品を探す</span>
      </template>
      <template v-slot:item="{ item }">
        <span class="list_categopry primary--text">{{ item.name }}</span>
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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StockRepository } from '@/repositories/stock.repository'
import { CategoryRepository } from '@/repositories/category.repository'
import { Category } from '@/models/category'

@Component
export default class StockHeader extends Vue {
  @Prop({ required: true })
  stockRepository!: StockRepository

  @Prop({ required: true })
  categoryRepository!: CategoryRepository

  selectCategory(category: Category) {
    this.stockRepository.setCategory(category.name)
    this.stockRepository.init()
    this.$router.push(`/stocks?category=${category.name}`)
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
