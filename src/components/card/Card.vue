<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      class="mt-5 rounded-xl"
      :elevation="4"
      width="500"
      height="690"
      style="position: relative"
    >
      <CardTitle :cardTitle="cardTitle"></CardTitle>
      <CardForm>
        <slot></slot>
      </CardForm>
      <CardBtn :next="next" :nextUrl="nextUrl"></CardBtn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

import CardTitle from '@/components/card/CardTitle.vue';
import CardBtn from '@/components/card/CardBtn.vue';
import CardForm from '@/components/card/CardForm.vue';

const props = defineProps(['cardTitle', 'next', 'nextUrl']);
const cardTitle = ref(props.cardTitle);
const next = ref(props.next);
const nextUrl = ref(props.nextUrl);

</script>

<style lang="scss" scoped></style>
