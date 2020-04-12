<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="clipped"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          router
          exact
          @click="blankPage(item.link)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="white" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="body-2 mx-auto" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
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
  clipped: boolean = false
  drawer: boolean = false
  title: string = '在庫速報.com'
  items: { title: string; icon: string; link: string }[] = [
    {
      title: '公式Twitter',
      icon: 'mdi-twitter',
      link: 'https://n-v-l.co/'
    },
    {
      title: 'お問い合わせ',
      icon: 'mdi-email-outline',
      link: 'https://n-v-l.co/'
    },
    {
      title: '利用規約',
      icon: 'mdi-file-document-outline',
      link: 'https://n-v-l.co/'
    },
    {
      title: 'プライバシーポリシー',
      icon: 'mdi-shield-key-outline',
      link: 'https://n-v-l.co/'
    },
    {
      title: '運営会社',
      icon: 'mdi-domain',
      link: 'https://n-v-l.co/'
    }
  ]

  blankPage(link: string) {
    window.open(link, '_blank')
  }
}
</script>
