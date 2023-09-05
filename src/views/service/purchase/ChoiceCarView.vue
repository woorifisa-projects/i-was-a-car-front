<template>
  <Card :cardTitle="cardTitle" :next="next">
    <ChoiceCarForm></ChoiceCarForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import ChoiceCarForm from '@/components/Form/ChoiceCarForm.vue';

const cardTitle = ref('차량 선택');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
