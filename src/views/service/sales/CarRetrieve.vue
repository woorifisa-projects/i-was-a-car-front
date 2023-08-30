<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <v-text-field
      label="성명"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="name"
    >
    </v-text-field>

    <v-text-field
      label="차량번호"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="carNumber"
    >
    </v-text-field>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import { useRetrieveCarStore } from '@/store/retrieveCar/retrieveCar.js';
import { ref, watch } from 'vue';

const name = ref('');
const carNumber = ref('');

const cardTitle = ref('차량 정보 조회');
const next = ref('조회하기');
const nextUrl = ref('car');

const store = useRetrieveCarStore();
const {setName, setCarNumber} = store;

watch([name, carNumber], ([name, carNumber]) => {
  setName(name);
  setCarNumber(carNumber);
});
</script>

<style lang="scss" scoped></style>
