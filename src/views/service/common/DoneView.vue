<template>
  <Card
    :cardTitle="props.cardTitle"
    :next="next"
    :nextUrl="props.nextUrl"
    :type="props.type"
    :prevUrl="props.prevUrl"
    :prev="props.prev"
  >
    <CompleteForm :done="props.done" :info="props.info"></CompleteForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import CompleteForm from '@/components/Form/CompleteForm.vue';

const props = defineProps([
  'nextUrl',
  'cardTitle',
  'done',
  'info',
  'type',
  'prevUrl',
  'prev',
]);

const next = ref('마이페이지로');
</script>

<style lang="scss" scoped></style>
