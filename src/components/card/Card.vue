<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      class="mt-2 rounded-xl"
      :elevation="xs ? 0 : 4"
      width="500"
      height="650"
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
        @onClickNextBtnEmit="onClickNextBtnEmit"
      ></CardBtn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

import CardTitle from '@/components/card/CardTitle.vue';
import CardBtn from '@/components/card/CardBtn.vue';
import CardForm from '@/components/card/CardForm.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const props = defineProps(['cardTitle', 'next', 'nextUrl']);
const emit = defineEmits(['onClickNextBtnEmit']);

const cardTitle = ref(props.cardTitle);
const next = ref(props.next);
const nextUrl = ref(props.nextUrl);

const onClickNextBtnEmit = () => emit('onClickNextBtnEmit');
</script>

<style lang="scss" scoped></style>
