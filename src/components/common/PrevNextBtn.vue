<template>
  <v-card-actions class="d-flex justify-space-between">
    <v-btn
      class="text-none"
      :elevation="2"
      width="120"
      height="40"
      @click="toPrev"
    >
      이전
    </v-btn>

    <v-btn
      class="text-none bg-black"
      :elevation="2"
      width="120"
      height="40"
      @click="toNext"
    >
      다음
    </v-btn>
  </v-card-actions>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['next']);
const next = props.next;

const toPrev = () => {
  router.go(-1);
};

const toNext = () => {
  router.push(next);
};
</script>

<style lang="scss" scoped></style>
