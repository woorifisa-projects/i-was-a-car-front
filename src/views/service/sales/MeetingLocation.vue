<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <FindAddress></FindAddress>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import FindAddress from '@/components/FindAddress.vue';
import { ref } from 'vue';

const cardTitle = ref('미팅 장소 입력');
const next = ref('다음');
const nextUrl = ref('car-info');
</script>

<style lang="scss" scoped></style>
