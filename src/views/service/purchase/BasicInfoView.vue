<template>
  <Card :cardTitle="cardTitle" :next="next">
    <BasicForm></BasicForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

import Card from '@/components/card/Card.vue';
import BasicForm from '@/components/Form/BasicForm.vue';

const cardTitle = ref('기본 정보 입력');
const next = ref('다음');
</script>

<style lang="scss" scoped></style>
