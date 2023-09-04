<template>
  <Card :cardTitle="cardTitle" :next="next">
    <CarTypeForm></CarTypeForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import CarTypeForm from '@/components/Form/CarTypeForm.vue';

const cardTitle = ref('차종 선택');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
