<template>
  <section class="bg-grey-lighten-4" style="height: 480px">
    <v-container class="py-10">
      <h1
        class="text-h3 text-sm-h2 font-weight-black text-decoration-underline text-center text-sm-left py-sm-5"
      >
        I Was a Car
      </h1>
      <div
        class="d-flex justify-space-between flex-wrap text-center text-sm-left"
      >
        <div>
          <p class="text-h6 text-sm-h4 font-weight-bold mt-12 mb-8">
            허위 매물 없는 중고차 구매 <br />및 대출 상품 연계 플랫폼
          </p>

          <v-divider class="mb-5"></v-divider>

          <p class="text-sm-subtitle-1 font-weight-bold px-7 px-sm-0">
            누군가에게는 좋은 차, 완벽한 차, 귀여운 차, 사랑스러운 차였던 <br />
            그 차를 복잡한 과정 없이 차를 잘 몰라도 원클릭으로 바로 거래
          </p>
        </div>
        <div
          class="d-flex justify-sm-end flex-sm-column"
          :class="{ 'custom-sm-width': smAndDown }"
        >
          <BtnBlack :destination="purchase" :msg="btnB"> </BtnBlack>
          <BtnWhite :destination="sales" :msg="btnW"></BtnWhite>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import BtnBlack from './common/BtnBlack.vue';
import BtnWhite from './common/BtnWhite.vue';

const { smAndDown } = useDisplay();

const btnB = '내 차 사기';
const btnW = '내 차 팔기';

const purchase = ref('/one-click-purchase/1');

const sales = ref('/one-click-sale/1');
</script>

<style lang="scss" scoped>
.custom-sm-width {
  width: 450px;
  margin-top: 25px;
  justify-content: space-around;
  flex-direction: row-reverse;
}
</style>
