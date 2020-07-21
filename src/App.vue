<template>
  <v-app>

    <v-app-bar
      ref="appToolbar"
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-title>KiraDashboard</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      fixed
    >
      <v-list class="pt-0" :expand="$vuetify.breakpoint.mdAndUp">
        <v-list-group
          no-action
          v-for="(group, index) in routing"
          :key="index"
          :prepend-icon="group.icon"
          :value="isExpanded(group)"
        >
          <template #activator>
            <v-list-item-title>{{ group.caption }}</v-list-item-title>
          </template>

          <v-list-item
            v-ripple
            v-for="(page, pageIndex) in group.pages"
            :key="`${index}-${pageIndex}`"
            :to="page.path"
            @click.prevent=""
          >
            <v-list-item-icon><v-icon>{{ page.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title>{{ page.caption }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="pt-0">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteGroup, Routing } from '@/router';

@Component
export default class App extends Vue {
  routing = Routing

  drawer = this.$vuetify.breakpoint.lgAndUp

  isExpanded(group: RouteGroup) {
    if (this.$vuetify.breakpoint.xsOnly) {
      const route = this.$route;
      return group.pages.some((page) => page.path === route.path);
    }
    return true;
  }
}

</script>
