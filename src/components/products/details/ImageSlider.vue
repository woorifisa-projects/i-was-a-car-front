<template>
  <div class="d-flex flex-column align-center w-22">
    <img class="w-22" v-bind:src="mainImage.url" alt="자동차 사진들" />
    <!-- 자동차 사진들 -->

    <div class="w-25-">
      <v-sheet class="mx-auto" elevation="0" color="rgba(0,0,0,0)">
        <v-slide-group
          v-model="model"
          class="pa-1"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="(car, index) in cars"
            :key="car.url"
            v-slot="{ toggle }"
          >
            <v-card
              color="rgba(0, 0, 0, 0)"
              :class="['ma-3', selectedClass]"
              height="100"
              width="100"
              elevation="0"
              @click="toggle"
              v-on:click="changeImage(index)"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-img v-bind:src="car.url"> </v-img>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  cars: Array,
});
const cars = ref(props.cars);

const mainImage = ref(cars.value[0]);
const changeImage = (index) => (mainImage.value = cars.value[index]);
</script>

<style lang="scss" scoped>
.w-22 {
  width: 22em;
}

.w-25- {
  width: 25em;
}
</style>
