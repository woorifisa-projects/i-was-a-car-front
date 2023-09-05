<template>
  <v-card-actions class="d-flex justify-space-around position">
    <v-btn
      class="text-none ma-0"
      :elevation="2"
      width="120"
      height="40"
      @click="toPrev"
    >
      이전</v-btn
    >
    <v-btn
      class="text-none bg-black ma-0"
      :elevation="2"
      width="120"
      height="40"
      @click="onClickNextBtn(), $emit('onClickNextBtnEmit')"
    >
      {{ next }}
    </v-btn>
  </v-card-actions>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['onClickNextBtnEmit']);
const router = useRouter();
const props = defineProps(['next', 'nextUrl']);
const nextUrl = props.nextUrl;
const next = ref(props.next);

const onClickNextBtn = () => router.push(nextUrl);
const toPrev = () => router.go(-1);
</script>

<style lang="scss" scoped>
.position {
  position: absolute;
  bottom: 3em;
  left: 50%;
  transform: translate(-50%);
  width: 350px;
}
</style>
