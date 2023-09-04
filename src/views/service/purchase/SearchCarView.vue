<template>
  <Card :cardTitle="cardTitle" :next="next">
    <SearchCarForm></SearchCarForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import SearchCarForm from '@/components/Form/SearchCarForm.vue';

const cardTitle = ref('자동차 대출 정보 입력');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
