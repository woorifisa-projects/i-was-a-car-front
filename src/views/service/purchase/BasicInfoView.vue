<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    :personal="true"
    :isReady="isReady"
  >
    <BasicForm @isReady="isReadyCheck"></BasicForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import BasicForm from '@/components/Form/BasicForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('기본 정보 입력');
const next = ref('본인 인증 하기');
const nextUrl = ref(props.nextUrl);
const isReady = ref(false);

const isReadyCheck = (child) => {
  isReady.value = child.value;
};
</script>

<style lang="scss" scoped></style>
