<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <div class="d-flex flex-column align-center">
      <img :src="imgUrl" class="main-img" />
      <br />
      <div>
        {{ carNumber }}
      </div>
      <div>
        <v-sheet class="mx-auto" elevation="0" color="rgba(0,0,0,0)">
        <v-slide-group
          v-model="model"
          class="pa-1"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="(item, index) in items"
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
            >
              {{ item }}
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import Card from '@/components/card/Card.vue';

const cardTitle = ref('차량정보');
const next = ref('다음');
const nextUrl = ref('images');
const items = ref([1,2,3,4,5]);

const imgUrl = ref(
  'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/k8Image.jpeg'
);
const carNumber = ref('99양0817');
</script>

<style lang="scss" scoped>
.main-img {
  width: 200px;
  margin: 0 auto;
}
</style>
