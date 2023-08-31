<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <v-text-field
      label="원하는 판매 가격"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="price"
    >
      <template v-slot:append-inner>
        <span style="width: 3em; font-size: 0.7em">만 원</span>
      </template>
    </v-text-field>

    <v-text-field
      label="예금주"
      density="compact"
      variant="underlined"
      class="my-10"
      v-mode="accountHolder"
    >
    </v-text-field>
    <div class="d-flex align-center">
      <v-select
        label="은행명"
        :items="bankList"
        variant="underlined"
        style="width: 30%; margin-right: 1em;"
        density="compact"
      ></v-select>
      <v-text-field
        label="계좌번호"
        density="compact"
        variant="underlined"
        style="width: 70%;"
        type="number"
      >
      </v-text-field>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import { ref } from 'vue';

const cardTitle = ref('가격 및 계좌정보 입력');
const next = ref('다음');
const nextUrl = ref('contract');

const price = ref();
const accountHolder = ref('');
const bankList = ref([
    '우리은행',
    '국민은행',
    '신한은행',
    '하나은행',
    '농협은행'
]);
</script>

<style lang="scss" scoped></style>
