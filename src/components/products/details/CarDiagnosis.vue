<template>
  <v-card>
    <v-card-title> 차량 진단서 ⭐️⭐️⭐️ </v-card-title>

    <v-card-item>
      <div class="d-flex justify-space-around flex-wrap align-content-stretch">
        <v-card-item>
          <div class="diagnosis">
            <div
              class="d-flex justify-space-around flex-wrap align-content-stretch"
            >
              <div class="diagnosis-item">
                <div class="diagnosis-box">1999년식</div>
                연식
              </div>
              <div class="diagnosis-item">
                <div class="diagnosis-box">8170 KM</div>
                주행거리
              </div>

              <div class="diagnosis-item">
                <div class="diagnosis-box">2 건</div>
                사고이력
              </div>

              <div class="diagnosis-item">
                <div class="diagnosis-box">YES</div>
                침수이력
              </div>
            </div>
          </div>
        </v-card-item>

        <v-card-item>
          <div>
            <table class="car-info-table">
              <tr>
                <td class="font-weight-bold">구동방식</td>
                <td class="font-weight-thin">구동방식</td>
              </tr>
              <tr>
                <td class="font-weight-bold">변속기</td>
                <td class="font-weight-thin">변속기</td>
              </tr>
              <tr>
                <td class="font-weight-bold">연료</td>
                <td class="font-weight-thin">연료</td>
              </tr>
              <tr>
                <td class="font-weight-bold">배기량</td>
                <td class="font-weight-thin">배기량</td>
              </tr>
              <tr>
                <td class="font-weight-bold">연비</td>
                <td class="font-weight-thin">연비</td>
              </tr>
            </table>
          </div>
        </v-card-item>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.diagnosis {
  max-width: 300px;
}

.diagnosis-item {
  text-align: center;
  font-weight: bold;
  margin-right: 0.5em;
  margin-bottom: 1em;
}

.diagnosis-box {
  display: flex;
  border: 5px solid #0057ff;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3em;
}

.car-info-table {
  border-collapse: collapse;
  width: 300px;
}
</style>
