<template>
  <v-btn
    @click="goTo"
    :width="btnWidth"
    size="x-large"
    class="bg-black font-weight-black my-2"
  >
    {{ msg }}
  </v-btn>
</template>

<script setup>
import { defineProps } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const router = useRouter();
const props = defineProps(['msg', 'destination']);
const msg = props.msg;
const destination = props.destination;

const { name } = useDisplay();

const btnWidth = computed(() => {
  switch (name.value) {
    case 'xs':
      return '150';
    case 'sm':
      return '250';
    case 'md':
      return '250';
    case 'lg':
      return '350';
    default:
      return '350';
  }
});

const goTo = () => router.push(destination);
</script>

<style lang="scss" scoped></style>
