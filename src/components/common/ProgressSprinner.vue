<template>
  <div
    class="d-flex justify-center align-center"
    :class="{ 'h-screen': props.isHscreen, 'h-400': !props.isHscreen }"
  >
    <v-progress-circular
      indeterminate
      :size="45"
      :width="5"
    ></v-progress-circular>
  </div>
</template>

<script setup>
const props = defineProps({
  isHscreen: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.h-400 {
  height: 400px;
}
</style>
