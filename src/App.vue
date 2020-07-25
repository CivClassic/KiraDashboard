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

    <v-main>
      <v-container fluid class="pt-0">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </v-container>
    </v-main>

    <v-dialog v-model="isDisconnected" persistent max-width="600px">
      <v-card :loading="isConnecting">
        <v-card-title>
          <span class="headline">Kira Authentication</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="tokenField"
            label="API Token"
            type="password"
            hint="Token can be retrieved by messaging Kira 'apitoken'"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="connect()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteGroup, Routing } from '@/router';
import { getModule } from 'vuex-module-decorators';
import Websocket, { WebsocketStatus } from '@/store/modules/websocket';

@Component
export default class App extends Vue {
  routing = Routing

  drawer = this.$vuetify.breakpoint.lgAndUp

  dialog = true

  tokenField = ''

  private websocketModule = getModule(Websocket, this.$store);

  mounted() {
    if (localStorage.kiraToken) {
      this.tokenField = localStorage.kiraToken;
      this.connect();
    }
  }

  get isConnecting(): boolean {
    return this.websocketModule.status === WebsocketStatus.CONNECTING;
  }

  get isDisconnected(): boolean {
    return this.websocketModule.status !== WebsocketStatus.CONNECTED;
  }

  connect() {
    this.websocketModule.connect(this.tokenField);
  }

  isExpanded(group: RouteGroup) {
    if (this.$vuetify.breakpoint.xsOnly) {
      const route = this.$route;
      return group.pages.some((page) => page.path === route.path);
    }
    return true;
  }
}

</script>
