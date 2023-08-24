<template>
  <section class="bg-black bg-grey-lighten-4" style="height: 450px">
    <v-container class="py-10">
      <h1
        class="text-h2 font-weight-bold text-decoration-underline text-center text-sm-left"
      >
        I was a car
      </h1>
      <div
        class="d-flex justify-space-between flex-wrap text-center text-sm-left"
      >
        <div>
          <p class="text-h6 text-sm-h4 font-weight-bold mt-12 mb-8">
            허위 매물 없는 중고차 구매 <br />및 대출 상품 연계 플랫폼
          </p>
          <p class="text-sm-subtitle">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            <br />
            ipsa tenetur optio excepturi ipsum assumenda temporibus! Suscipit
          </p>
        </div>
        <div
          class="d-flex justify-sm-end flex-sm-column"
          :class="{ 'custom-sm-width': smAndDown }"
        >
          <v-btn
            :width="btnWidth"
            size="x-large"
            class="bg-black font-weight-black my-2"
            >내 차 사기</v-btn
          >
          <v-btn :width="btnWidth" size="x-large" class="font-weight-black my-2"
            >내 차 팔기</v-btn
          >
        </div>
      </div>
    </v-container>
  </section>
  
  <v-container>
    
    <v-card-text class="d-flex">
      <v-col
        cols="2"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-autocomplete 
          :items="cars"
          color="grey"
          theme="light"
          variant="solo"
          label="선택"
          single-line
        ></v-autocomplete>
      </v-col>

      <v-col
        cols="1"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          color="grey"
          theme="light"
          variant="solo"
          label="원하는 차종 또는 제조사를 입력해주세요."
          clearable
          single-line
          @click:append-inner="onClick"
        ></v-text-field>
        
      </v-col>

    </v-card-text>
    
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
    
  </v-container>


  
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';


const products = ref([
  { 
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'

  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  {
    name: '포르쉐 뉴 카이엔3.0 디젤 958', 
    year: '16/08',
    distance: '210,710',
    price: '3200'
  },
  ])
const { name, smAndDown } = useDisplay();

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

const cars = computed(() => ["차종", "제조사"])

const loading = ref(false);

const onClick = () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 2000)
}

</script>

<style scoped>
.custom-sm-width {
  width: 450px;
  margin-top: 25px;
  justify-content: space-around;
  flex-direction: row-reverse;
}
</style>
