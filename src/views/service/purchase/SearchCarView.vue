<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <SearchCarForm></SearchCarForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import SearchCarForm from '@/components/Form/SearchCarForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('자동차 대출 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
