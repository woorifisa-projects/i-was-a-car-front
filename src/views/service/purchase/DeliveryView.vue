<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <DeliveryForm></DeliveryForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import DeliveryForm from '@/components/Form/DeliveryForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('탁송 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
