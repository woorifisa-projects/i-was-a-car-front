<template>
  <v-footer class="bg-black">
    <v-container class="text-center d-flex flex-column">
      <div>
        <v-btn 
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :prepend-icon="icon.icon"
          stacked
          rounded="xl"
          variant="text"
          :href="icon.to" target="_blank">
          {{ icon.name }}</v-btn
        >
      </div><br/>
      <div class="pt-0">
        대표 이사: 황동민 | 주소: 서울특별시 상암 어딘가<br/><br/>
        I was a car 가 제공하는 서비스는 온라인 거래장소 및 기타 부가정보 제공에 한하며, 실제 거래의 모든 책임은 판매자와 구매자에게 있음을 안내드립니다.<br/>
        본 사이트/앱 상의 모든 정보, 콘텐츠, UI 등에 대한 무단 복제, 배포, 스크래핑 등의 행위는 법에 의하여 엄격히 금지됩니다.
      </div><br/>

      <v-divider></v-divider>

      <div>
        <strong>{{ new Date().getFullYear() }} — I was a car</strong>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const icons = ref([
  {
    icon: 'mdi-github',
    to: 'https://github.com/woorifisa-projects/i-was-a-car-front',
    name: 'FE',
  },
  {
    icon: 'mdi-github',
    to: 'https://github.com/woorifisa-projects/i-was-a-car-back',
    name: 'BE',
  },
]);
</script>

<style scoped></style>
