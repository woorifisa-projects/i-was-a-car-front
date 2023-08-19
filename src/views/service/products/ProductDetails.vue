<template>
  <v-container class="bg-red">
    <v-sheet class="d-flex">
      <div class="bg-blue">자동차 사진들</div>
      <div class="bg-green">
        <v-card>
          <v-card-title>제조사 차명 연료 배기량</v-card-title>
          <v-card-text>판매 가격 8000만원</v-card-text>
          <v-card-text>생일: 1999년 지금까지 달려 온 거리: 8170km</v-card-text>
        </v-card>

        <div class="d-flex justify-space-between">
          <v-btn class="bg-grey">상담 신청</v-btn>
          <v-btn class="bg-black"
            >홈 서비스 구매하기 <br />
            8/14일 도착</v-btn
          >
        </div>
      </div>
    </v-sheet>

    <br />

    <v-card>
      <v-card-title>IWC 금융 서비스</v-card-title>
      <div>
        <div>
          <v-card-text>판매 가격</v-card-text>
          <v-text-field model-value=" " suffix="만원"></v-text-field>
        </div>
        <div>
          <v-card-text>선수금</v-card-text>
          <v-select
            v-model="none"
            label="Select"
            hint="items"
            :items="myItems"
          ></v-select>
        </div>
      </div>
      <v-card-text>총 할부 신청 금액: - 원</v-card-text>

      <div>
        <div>
          <v-text-field>기간</v-text-field>
          <v-btn variant="outlined">12개월</v-btn>
          <v-btn variant="outlined">24개월</v-btn>
          <v-btn variant="outlined">36개월</v-btn>
          <v-btn variant="outlined">48개월</v-btn>
          <v-btn variant="outlined">60개월</v-btn>
        </div>
        <div>
          <v-card-text>월 납입 예상 금액: -원</v-card-text>
          <v-card-subtitle>기준금리 3.5%로 계산한 결과입니다.</v-card-subtitle>
        </div>
      </div>
    </v-card>
    <br />
    <v-card>
      <v-card-title> 차량 진단서 ⭐️⭐️⭐️ </v-card-title>
      <div>연식 주행거리 사고이력 침수이력</div>
      <div>구동방식 변속기 연료 배기량 연비</div>
    </v-card>
  </v-container>
</template>

<script setup>
const myItems = ['없음', '10%', '20%', '30%', '40%', '50%'];
const none = '없음';
</script>

<style lang="scss" scoped></style>
