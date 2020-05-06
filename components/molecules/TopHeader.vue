<template>
  <div>
    <h1 class="subtitle-1 font-weight-bold">在庫ナビについて</h1>
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
          style="border-color: #00BFFF !important"
          @click="clickCategory(category)"
        >
          {{ category.name }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { Category } from '@/models/category'

@Component
export default class TopHeader extends Vue {
  @Prop({ default: [] })
  categories!: Category[]

  @Emit('click-category')
  clickCategory(category: Category) {
    return category
  }
}
</script>
