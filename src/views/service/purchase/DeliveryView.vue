<template>
  <Card :cardTitle="cardTitle" :next="next">
    <DeliveryForm></DeliveryForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import DeliveryForm from '@/components/Form/DeliveryForm.vue';

const cardTitle = ref('탁송 정보 입력');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
