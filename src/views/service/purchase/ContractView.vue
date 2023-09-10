<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <ContractForm></ContractForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import ContractForm from '@/components/Form/ContractForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
