<template>
  <v-data-table
    disable-pagination
    hide-default-footer
    must-sort
    :mobile-breakpoint="0"
    :headers="headers"
  >

    <template #header.btn>
      <v-menu offsety-y>
        <template #activator="{ on}">
          <v-btn icon v-on="on">
            <v-icon small>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-icon class="mr-1">mdi-notification-clear-all</v-icon>
            Clear All
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CommandList extends Vue {
  headers = [
    {
      text: 'Date',
      value: 'date',
      width: '15%',
    },
    {
      text: 'Message',
      value: 'message',
      sortable: false,
      width: '74%',
    },
    {
      text: '',
      value: 'btn',
      sortable: false,
      width: '1%',
    },
  ];
}
</script>
