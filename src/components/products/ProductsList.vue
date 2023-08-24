<template>
  <v-sheet class="d-flex flex-wrap justify-space-around">
    <v-card-actions
      v-for="product in products"
      :key="product.name"
      class="ma-2 pa-2"
    >
      <router-link :to="`/products/${product.id}`">
        <v-card-text class="mx-auto" width="450">
          <v-img :src="product.images" cover height="300"></v-img>

          <v-card class="mx-auto" width="450">
            <v-card-title>
              {{ product.brand }} {{ product.name }} {{ product.fuel }}
              {{ (product.displacement / 1000).toFixed(1) }}
              {{ product.drivingMethod }}
            </v-card-title>

            <v-card-subtitle>
              연식: {{ product.year.substring(0, product.year.length - 3) }} |
              주행거리: {{ product.distance.toLocaleString() }} km
            </v-card-subtitle>

            <v-card-title class="text-sm-right">
              {{ (product.price / 10000).toLocaleString() }}만원
            </v-card-title>
          </v-card>
        </v-card-text>
      </router-link>
    </v-card-actions>
  </v-sheet>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['products']);
const products = ref(props.products);
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
