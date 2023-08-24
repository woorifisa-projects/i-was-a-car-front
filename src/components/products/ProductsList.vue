<template>
    <v-sheet class="d-flex flex-wrap justify-space-around">
    <v-card-actions
      v-for="product in products"
      :key="product.name"
      class="ma-2 pa-2"
    >
    <v-card-text
    class="mx-auto"
    width="450"
  >
    <v-img
      src="https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/main-test.png"
      cover
    ></v-img>

    <v-card
    class="mx-auto"
    width="450"
  >

    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle>
      연식: {{ product.year }} | 주행거리: {{ product.distance }}
    </v-card-subtitle>

   
    <v-card-title class="text-sm-right">
      {{ product.price }}만원
    </v-card-title>

  </v-card>

  </v-card-text>
    </v-card-actions>
  </v-sheet>
    
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['products']);
const products = ref(props.products);


</script>

<style lang="scss" scoped>

</style>