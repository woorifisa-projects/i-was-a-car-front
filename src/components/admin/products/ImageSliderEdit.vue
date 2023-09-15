<template>
  <div class="d-flex flex-column align-center w-22-">
    <v-img class="w-22" v-bind:src="mainImage" lt="자동차 사진들">
      <v-btn icon variant="text" :ripple="false" absolute @click="deleteImage">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </v-img>

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
            v-for="(carImage, index) in carImages"
            :key="index"
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
                <v-img v-bind:src="carImage"> </v-img>
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
  carImages: Array,
});

const selectedClass = ref(null);
const model = ref(null);
const carImages = ref(props.carImages);
const mainImageIndex = ref(0);
const mainImage = ref(carImages.value[0]);
const changeImage = (index) => {
  mainImage.value = carImages.value[index];
  mainImageIndex.value = index;
};

const deleteImage = () => {
  carImages.value.splice(mainImageIndex.value, 1);

  // if there are still images left after deletion
  if (carImages.value.length > 0) {
    // show the first one or keep showing the same one if it wasn't deleted
    const newIndex =
      mainImageIndex.value >= carImages.value.length
        ? carImages.value.length - 1
        : mainImageIndex.value;
    changeImage(newIndex);
  } else {
    // no more images left to show
    mainImage.value = null;
    model.value = null;
  }
};
</script>

<style lang="scss" scoped>
.w-22 {
  width: 22em;
}

.w-25- {
  width: 25em;
}
</style>
