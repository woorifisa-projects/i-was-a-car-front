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
      <CardBtn
        :next="next"
        :nextUrl="nextUrl"
        :id="paramsId"
        :personal="personal"
        :isReady="isReady"
        @onClickNextBtnEmit="onClickNextBtnEmit"
      ></CardBtn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

import CardTitle from '@/components/card/CardTitle.vue';
import CardBtn from '@/components/card/CardBtn.vue';
import CardForm from '@/components/card/CardForm.vue';

const props = defineProps([
  'cardTitle',
  'next',
  'nextUrl',
  'personal',
  'isReady',
]);
const emit = defineEmits(['onClickNextBtnEmit']);

const cardTitle = ref(props.cardTitle);
const next = ref(props.next);
const nextUrl = ref(props.nextUrl);
const personal = ref(props.personal);
const isReady = ref(props.isReady);

const onClickNextBtnEmit = () => {
  personal.value = false;
  emit('onClickNextBtnEmit');
};
</script>

<style lang="scss" scoped></style>
