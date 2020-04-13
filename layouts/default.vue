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
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" app hide-on-scroll>
      <v-toolbar-title
        class="primary--text font-weight-bold mx-auto"
        v-text="title"
      />
      <v-spacer />
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-content class="grey lighten-3" style="padding-bottom: 80px">
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
  items: { title: string; icon: string; link: string }[] = [
    {
      title: '公式Twitter',
      icon: 'mdi-twitter',
      link: 'https://n-v-l.co/'
    },
    {
      title: 'お問い合わせ',
      icon: 'mdi-email-outline',
      link:
        'https://docs.google.com/forms/d/e/1FAIpQLScTthkmB5qmiqFo_3Pv2dCnkZzEvteIB-U0A5M-Bg5OtN38rA/viewform'
    },
    {
      title: '利用規約',
      icon: 'mdi-file-document-outline',
      link:
        'https://docs.google.com/document/d/1trQEpTnOSHg4JM3PQUTxq2yKjwYfjOU_-ALObInEhnY/edit?usp=sharing'
    },
    {
      title: 'プライバシーポリシー',
      icon: 'mdi-shield-key-outline',
      link:
        'https://docs.google.com/document/d/1hmpBqO_yGTFGOX73OXLH8tWEMaOnLw6VHuyzo2SiBEc/edit?usp=sharing'
    },
    {
      title: '運営会社',
      icon: 'mdi-domain',
      link: 'https://n-v-l.co/'
    },
    {
      title: '改善リクエストはこちら',
      icon: 'mdi-domain',
      link:
        'https://docs.google.com/forms/d/e/1FAIpQLSdl2Vn7SO45WQpngTqDMI_BStgSWrb6HfwnlujEDNsA8tt-Ow/viewform'
    }
  ]

  blankPage(link: string) {
    window.open(link, '_blank')
  }
}
</script>
