<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          router
          exact
          @click="blankPage(item.link)"
        >
          <v-list-item-action class="mr-3">
            <v-icon v-if="item.type === 'link'" color="primary">{{
              item.icon
            }}</v-icon>
            <v-img v-if="item.type === 'share'" :src="item.icon" width="16" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="primary--text body-2"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="white"
      app
      class="elevation-0"
      dense
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important"
    >
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="" style="cursor: pointer; " @click="home">
            <h1 class="title font-weight-bold" style="color: #00BFFF">
              {{ title }}
            </h1>
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end pa-0">
          <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content
      class="mx-auto white"
      style="padding-bottom: 80px; max-width: 800px; width: 100%;"
    >
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Page extends Vue {
  drawer: boolean = false
  title: string = '在庫ナビ'
  items: { title: string; type: string; icon: string; link: string }[] = [
    {
      title: '公式nwitter',
      type: 'link',
      icon: 'mdi-twitter',
      link: 'https://twitter.com/zaiko_navi'
    },
    {
      title: 'お問い合わせ',
      type: 'link',
      icon: 'mdi-email-outline',
      link:
        'https://docs.google.com/forms/d/e/1FAIpQLScTthkmB5qmiqFo_3Pv2dCnkZzEvteIB-U0A5M-Bg5OtN38rA/viewform'
    },
    {
      title: '利用規約',
      type: 'link',
      icon: 'mdi-file-document-outline',
      link:
        'https://docs.google.com/document/d/1trQEpTnOSHg4JM3PQUTxq2yKjwYfjOU_-ALObInEhnY/edit?usp=sharing'
    },
    {
      title: 'プライバシーポリシー',
      type: 'link',
      icon: 'mdi-shield-key-outline',
      link:
        'https://docs.google.com/document/d/1hmpBqO_yGTFGOX73OXLH8tWEMaOnLw6VHuyzo2SiBEc/edit?usp=sharing'
    },
    {
      title: '運営会社',
      type: 'link',
      icon: 'mdi-domain',
      link: 'https://n-v-l.co/'
    },
    {
      title: '改善リクエストはこちら',
      type: 'link',
      icon: 'mdi-lightbulb-on-outline',
      link:
        'https://docs.google.com/forms/d/e/1FAIpQLSdl2Vn7SO45WQpngTqDMI_BStgSWrb6HfwnlujEDNsA8tt-Ow/viewform'
    },
    {
      title: 'Facebookにシェア',
      type: 'share',
      icon: '/icon/facebook.png',
      link: this.shareFacebook
    },
    {
      title: 'Twitterにシェア',
      type: 'share',
      icon: '/icon/twitter.png',
      link: this.shareTwitter
    },
    {
      title: 'LINEにシェア',
      type: 'share',
      icon: '/icon/line.png',
      link: this.shareLine
    }
  ]

  blankPage(link: string) {
    window.open(link, '_blank')
  }

  home() {
    this.$router.push('/')
  }

  get shareTwitter() {
    const baseUrl = 'https://mobile.twitter.com/intent/tweet?'
    const text = [
      'text',
      '配送日順での並び替えも可能！\nマスクなどの不足している商品を探せる「在庫ナビ」はこちら\n'
    ]
    const hashtags = ['hashtags', ['在庫ナビ ', 'マスク在庫'].join(',')]
    const url = ['url', location.href]
    const query = new URLSearchParams([text, url, hashtags]).toString()
    return `${baseUrl}${query}`
  }

  get shareFacebook() {
    const baseUrl = 'https://www.facebook.com/sharer/sharer.php?'
    const url = ['u', location.href]
    const query = new URLSearchParams([url]).toString()
    console.log(query)
    return `${baseUrl}${query}`
  }

  get shareLine() {
    return `https://social-plugins.line.me/lineit/share?url=${location.href}`
  }
}
</script>
