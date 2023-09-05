<template>
  <v-virtual-scroll :height="400" :items="contract">
    <template v-slot:default="{ item }">
      <v-card-title v-if="item.order == 1" class="text-h5">
        {{ item.documentName }}
      </v-card-title>
      <v-card-text
        v-if="item.documentName == `자동차 매매 계약서` && item.order > 3"
        >{{ item.content }}
      </v-card-text>
      <v-card-text v-if="item.documentName != `자동차 매매 계약서`"
        >{{ item.content }}
      </v-card-text>
    </template>
  </v-virtual-scroll>
</template>

<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps(['contract']);
const contract = ref(props.contract);
</script>

<style lang="scss" scoped></style>
