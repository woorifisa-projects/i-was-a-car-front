<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <BasicForm></BasicForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import BasicForm from '@/components/Form/BasicForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('기본 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
