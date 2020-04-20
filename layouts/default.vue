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
            <v-icon color="primary">{{ item.icon }}</v-icon>
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
          <v-toolbar-title
            class="font-weight-bold"
            style="cursor: pointer; color: #00BFFF"
            @click="home"
            v-text="title"
          />
        </v-col>
        <v-col cols="2" class="d-flex justify-end pa-0">
          <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content class="white" style="padding-bottom: 80px">
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
      link: 'https://twitter.com/zaiko_navi'
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
      icon: 'mdi-lightbulb-on-outline',
      link:
        'https://docs.google.com/forms/d/e/1FAIpQLSdl2Vn7SO45WQpngTqDMI_BStgSWrb6HfwnlujEDNsA8tt-Ow/viewform'
    }
  ]

  blankPage(link: string) {
    window.open(link, '_blank')
  }

  home() {
    this.$router.push('/')
  }
}
</script>
