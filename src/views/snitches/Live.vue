<template>
  <v-row>
    <snitch-list/>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SnitchList from '@/components/snitch/SnitchList.vue';

@Component({
  components: {
    SnitchList,
  },
})
export default class Live extends Vue {
}
</script>
