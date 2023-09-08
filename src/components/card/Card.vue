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
        :prev="prev"
        :prevUrl="prevUrl"
        @onClickNextBtnEmit="onClickNextBtnEmit"
        @alertTrue="alertTrue"
      ></CardBtn>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

import CardTitle from '@/components/card/CardTitle.vue';
import CardBtn from '@/components/card/CardBtn.vue';
import CardForm from '@/components/card/CardForm.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const props = defineProps(['cardTitle', 'next', 'nextUrl', 'prev', 'prevUrl']);
const emit = defineEmits(['onClickNextBtnEmit', 'alertTrue']);

const cardTitle = ref(props.cardTitle);
const next = ref(props.next);
const nextUrl = ref(props.nextUrl);
const prev = ref(props.prev == null ? null : props.prev);
const prevUrl = ref(props.prevUrl == null ? null : props.prevUrl);

const onClickNextBtnEmit = () => {
  emit('onClickNextBtnEmit');
};

const alertTrue = () => {
  emit('alertTrue', true);
};
</script>

<style lang="scss" scoped></style>
