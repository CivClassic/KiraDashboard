<template>
  <v-row>
    <v-col cols="12" class="pt-1">
      <command-input/>
    </v-col>
    <v-col cols="12">
      <command-list/>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import CommandInput from '@/components/command/CommandInput.vue';
import CommandList from '@/components/command/CommandList.vue';

@Component({
  components: {
    CommandList,
    CommandInput,
  },
})
export default class Console extends Vue {
}
</script>
