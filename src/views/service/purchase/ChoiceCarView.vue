<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <ChoiceCarForm @targetProduct="whichTargetProduct"></ChoiceCarForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import ChoiceCarForm from '@/components/Form/ChoiceCarForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('차량 선택');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
