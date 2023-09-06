<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      class="mt-5 rounded-xl"
      :elevation="4"
      width="500"
      height="690"
      style="position: relative"
    >
      <CardTitle :cardTitle="cardTitle"></CardTitle>

      <div
        v-if="!isLoaded"
        style="height: 20em"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card-title style="font-size: 1.5em">계약 중</v-card-title>
        <br />
        <v-progress-linear indeterminate></v-progress-linear>
      </div>

      <CardForm v-else>
        <div class="d-flex flex-column justify-center align-center">
          <h1>계약이 완료되었습니다.</h1>
        </div>
      </CardForm>

      <v-card-actions class="d-flex justify-space-around btn">
        <v-btn
          class="text-none ma-0"
          :elevation="2"
          width="120"
          height="40"
          @click="toHome"
        >
          홈으로</v-btn
        >
        <v-btn
          class="text-none bg-black ma-0"
          :elevation="2"
          width="120"
          height="40"
          @click="toDetail"
          :disabled="!isLoaded"
        >
          상세보기
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { createProduct } from '@/apis/service/histories/sales/saleApi';
import { useRouter } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';

import CardTitle from '@/components/card/CardTitle.vue';
import CardForm from '@/components/card/CardForm.vue';

// /mypage/sale/:id

const route = useRouter();

const response = ref();
const cardTitle = ref('계약 완료');
const isLoaded = ref(true);
const detailPath = () => ref('/');
const toHome = () => route.push('/');
let toDetail;

watch(response, (resp) => {
  detailPath.value = resp.saleId;
  isLoaded.value = true;
  toDetail = route.push(`/mypage/sale/${detailPath}`);
});

onBeforeMount(() => {
  createProduct()
    .then((resp) => {
      console.log(resp);
      response.value = resp.data.data;
    })
    .catch((e) => console.error(e));
});
</script>

<style lang="scss" scoped>
.btn {
  position: absolute;
  bottom: 3em;
  left: 50%;
  transform: translate(-50%);
  width: 350px;
}
</style>
