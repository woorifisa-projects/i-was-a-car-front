<template>
  <div class="d-flex flex-column align-start w-100">
    <v-img
      class="w-100"
      v-bind:src="mainImage"
      alt="자동차 사진들"
      cover
      style="max-height: 360px"
    />
    <!-- 자동차 사진들 -->
    <div class="w-100 mt-2">
      <v-card class="mx-auto" elevation="1">
        <v-slide-group
          class="w-100"
          v-model="model"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="(carImage, index) in carImages"
            :key="index"
            v-slot="{ toggle }"
          >
            <v-card
              class="mr-1"
              :class="[selectedClass]"
              :height="xs ? '100' : '150'"
              :width="xs ? '100' : '150'"
              elevation="0"
              @click="toggle"
              v-on:click="changeImage(index)"
            >
              <div class="d-flex fill-height">
                <v-img cover v-bind:src="carImage"> </v-img>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const props = defineProps({
  carImages: Array,
});

const { xs } = useDisplay();

const selectedClass = ref(null);
const model = ref(null);
const carImages = ref(props.carImages);
const mainImage = ref(carImages.value[0]);
const changeImage = (index) => (mainImage.value = carImages.value[index]);
</script>

<style lang="scss" scoped>
.w-22 {
  width: 22em;
}

.w-25- {
  width: 25em;
}
</style>
