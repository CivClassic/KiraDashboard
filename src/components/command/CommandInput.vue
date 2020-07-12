<template>
  <v-row
    no-gutters
    class="flex-shrink-1 grow"
    align="center"
  >

    <v-col>
      <v-combobox
        hide-selected
        ref="input"
      >
        <template #item="{ item }">
          <code>{{ item.text }}</code>
          <v-spacer/>
          <v-btn icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-combobox>
    </v-col>

    <v-col
      class="ml-1 flex-shrink-1"
      cols="auto"
    >
      <v-btn
        color="info"
      >
        <v-icon class="mr-2">mdi-send</v-icon>
        Send
      </v-btn>
    </v-col>

  </v-row>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CommandInput extends Vue {
}
</script>
