<template>
  <v-card>
    <v-card-title>주행 거리 분석</v-card-title>

    <div class="d-flex justify-center">
      <div class="w-97">
        <v-slider v-model="slider2" track-color="gray"></v-slider>
      </div>
    </div>

    <v-card-text>
      총 <span class="color-blue font-bold">25년 1개월</span> 동안
      <span class="color-blue font-bold">8170 KM</span>
      <br />
      연평균 <span class="color-blue font-bold"> 326 KM </span>
      <br />
      [
      <span class="font-bold"> 123가4567 </span>
      ]의 주행거리는 일반적인 연평균 주행거리 대비 [
      <span class="color-blue font-bold">매우 짧음</span>
      ]입니다.
    </v-card-text>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.w-97 {
  width: 97%;
}

.color-blue {
  color: #0057ff;
}

.font-bold {
  font-weight: bold;
}
</style>
