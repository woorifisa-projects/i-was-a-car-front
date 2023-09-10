<template>
  <Card :cardTitle="props.cardTitle" :next="next" :nextUrl="props.nextUrl">
    <CompleteForm :done="props.done" :info="props.info"></CompleteForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import CompleteForm from '@/components/Form/CompleteForm.vue';

const props = defineProps(['nextUrl', 'cardTitle', 'done', 'info']);

const next = ref('거래 상세');
</script>

<style lang="scss" scoped></style>
