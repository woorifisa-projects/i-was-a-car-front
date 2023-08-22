<template>
  <v-card>
    <v-card-title>IWC 금융 서비스</v-card-title>
    <v-card-item>
      <div class="d-flex justify-space-around flex-wrap align-content-stretch">
        <div class="w-30">
          <v-card-item>
            <v-card-text>판매 가격</v-card-text>
            <v-text-field suffix="만원"></v-text-field>
          </v-card-item>
        </div>

        <div class="w-30">
          <v-card-item>
            <v-card-text>선수금</v-card-text>
            <v-select
              v-model="none"
              label="Select"
              hint="items"
              :items="myItems"
            ></v-select>
          </v-card-item>
        </div>
      </div>
    </v-card-item>

    <v-card-text>총 할부 신청 금액: - 원</v-card-text>

    <div>
      <div>
        <v-card-text>기간</v-card-text>
        <v-card-item>
          <div
            class="d-flex justify-space-between flex-wrap align-content-stretch"
          >
            <v-btn variant="outlined">12개월</v-btn>
            <v-btn variant="outlined">24개월</v-btn>
            <v-btn variant="outlined">36개월</v-btn>
            <v-btn variant="outlined">48개월</v-btn>
            <v-btn variant="outlined">60개월</v-btn>
          </div>
        </v-card-item>
      </div>
      <div>
        <v-card-text>월 납입 예상 금액: -원</v-card-text>

        <v-card-subtitle>기준금리 3.5%로 계산한 결과입니다.</v-card-subtitle>
        <br />
      </div>
    </div>
  </v-card>
</template>

<script setup>
const myItems = ['없음', '10%', '20%', '30%', '40%', '50%'];
const none = '없음';
</script>

<style lang="scss" scoped>
.w-30 {
  width: 30em;
}
</style>
