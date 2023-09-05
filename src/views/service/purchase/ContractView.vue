<template>
  <Card :cardTitle="cardTitle" :next="next">
    <ContractForm></ContractForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import ContractForm from '@/components/Form/ContractForm.vue';

const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
