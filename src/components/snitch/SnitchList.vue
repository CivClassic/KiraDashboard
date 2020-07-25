<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table
      disable-pagination
      hide-default-footer
      must-sort
      :mobile-breakpoint="0"
      :headers="headers"
      :items="snitchHits"
      :search="search"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import Snitches from '@/store/modules/snitches';
import { SnitchAlertJson } from '@/model/websocket/types/data';

@Component
export default class SnitchList extends Vue {
  search = '';

  headers = [
    {
      text: 'Date',
      value: 'time',
    },
    {
      text: 'Player',
      value: 'player',
    },
    {
      text: 'Action',
      value: 'action',
    },
    {
      text: 'Snitch',
      value: 'snitch.name',
    },
    {
      text: 'Group',
      value: 'snitch.group',
    },
    {
      text: 'World',
      value: 'snitch.location.world',
    },
    {
      text: 'x',
      value: 'snitch.location.x',
      sortable: false,
    },
    {
      text: 'y',
      value: 'snitch.location.y',
      sortable: false,
    },
    {
      text: 'z',
      value: 'snitch.location.z',
      sortable: false,
    },
  ];

  private snitchModule = getModule(Snitches, this.$store);

  get snitchHits(): SnitchAlertJson[] {
    return this.snitchModule.snitchHits
      .sort((a, b) => b.time - a.time);
  }
}
</script>
