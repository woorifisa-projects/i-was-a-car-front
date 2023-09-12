<template>
  <v-sheet class="d-flex flex-wrap justify-space-around">
    <v-card-actions v-for="product in products" :key="product.name">
      <router-link :to="`/products/${product.id}`">
        <v-card-text class="mx-auto" width="400">
          <v-img :src="product.images" cover :height="xs ? 200 : 250"></v-img>

          <v-card class="mx-auto" :width="xs ? 290 : 400">
            <v-card-title class="text-subtitle-1 text-sm-h6 font-weight-bold">
              {{ product.brand }} {{ product.name }} {{ product.fuel }}
              {{ (product.displacement / 1000).toFixed(1) }}
              {{ product.drivingMethod }}
            </v-card-title>

            <v-card-subtitle>
              연식: {{ product.year.substring(0, product.year.length - 3) }} |
              주행거리: {{ product.distance.toLocaleString() }} km
            </v-card-subtitle>

            <v-card-title class="text-right">
              {{ Math.floor(product.price / 10000).toLocaleString() }}만원
            </v-card-title>
          </v-card>
        </v-card-text>
      </router-link>
    </v-card-actions>
  </v-sheet>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const props = defineProps(['products']);
const products = ref(props.products);
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
