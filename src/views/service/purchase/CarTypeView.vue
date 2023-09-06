<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <CarTypeForm></CarTypeForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import CarTypeForm from '@/components/Form/CarTypeForm.vue';

const cardTitle = ref('차종 선택');
const next = ref('다음');
const nextUrl = ref('3');
</script>

<style lang="scss" scoped></style>
