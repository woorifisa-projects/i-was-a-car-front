<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <v-text-field
      label="미팅 날짜 선택"
      density="compact"
      variant="underlined"
      v-model="meetingDate"
      type="datetime-local"
    >
    </v-text-field>
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
const meetingDate = ref('');


</script>

<style lang="scss" scoped></style>
