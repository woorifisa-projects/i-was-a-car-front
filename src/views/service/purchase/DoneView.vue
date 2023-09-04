<template>
  <Card :cardTitle="cardTitle" :next="next">
    <CompleteForm></CompleteForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import CompleteForm from '@/components/Form/CompleteForm.vue';

const cardTitle = ref('원클릭 차량 접수 완료');
const next = ref('거래 상세');
</script>

<style lang="scss" scoped></style>
