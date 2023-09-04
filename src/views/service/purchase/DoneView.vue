<template>
  <Card :cardTitle="cardTitle" :next="next">
    <DoneForm></DoneForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import DoneForm from '@/components/Form/DoneForm.vue';

const cardTitle = ref('원클릭 차량 접수 완료');
const next = ref('거래 상세');
</script>

<style lang="scss" scoped></style>
