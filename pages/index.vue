<template>
  <div class="primary--text">
    <h1 class="mt-5 subtitle-1 font-weight-bold">在庫ナビについて</h1>
    <p style="font-size: 13px">
      在庫ナビは、不足品となっているマスクやアルコール<br />
      ジェルなどを手軽に探せるサービスです。<br />
      価格順、量順、配送日順で並び替えることができるので、<br />
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
          class="primary--text white body-2"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CATEGORIES } from '@/enum/category.enum'

@Component
export default class TemplatePage extends Vue {
  get categories() {
    return CATEGORIES
  }
}
</script>
