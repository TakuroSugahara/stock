<template>
  <v-card flat color="white">
    <v-list-item two-line>
      <v-list-item-avatar tile size="80" color="grey lighten-2">
        <v-img :src="stock.image">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
                width="1"
                size="20"
              />
            </v-row>
          </template>
        </v-img>
      </v-list-item-avatar>

      <v-list-item-content class="body-2">
        <v-list-item-subtitle class="primary--text mb-2 font-weight-bold">{{
          stock.title
        }}</v-list-item-subtitle>
        <div class="red--text subtitle-2 font-weight-bold mb-1">
          {{ displayPrice }}
        </div>
        <div class="red--text mb-2" style="font-size: 12px;">
          発送予定日 : {{ displayDeliveryDate }}
        </div>
        <v-btn
          target="_blank"
          :href="stock.affiliateLink"
          class="font-weight-bold elevation-0 mb-2"
          color="accent"
          block
          >詳細を見る</v-btn
        >
        <div class="overline">
          <span class="primary--text font-weight-bold">
            {{ stock.platform }}
          </span>
          <span class="grey--text"> {{ stock.shopName }}</span>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { Stock } from '@/models/stock'

@Component
export default class StockCard extends Vue {
  @Prop({ default: false })
  stock!: Stock

  get displayPrice(): string {
    return `${this.stock.price}円 / ${this.stock.amount}${this.stock.unit}`
  }

  get displayDeliveryDate(): string {
    if (!this.stock.deliveryDate) {
      return '--'
    }
    return moment(this.stock.deliveryDate).format('YYYY/MM/DD')
  }
}
</script>
