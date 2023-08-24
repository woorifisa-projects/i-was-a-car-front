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
                <div class="diagnosis-box">
                  {{ new Date(Date.parse(carInfo.year)).getFullYear() }}년식
                </div>
                연식
              </div>

              <div class="diagnosis-item">
                <div class="diagnosis-box">
                  {{ carInfo.distance.toLocaleString() }} KM
                </div>
                주행거리
              </div>

              <div class="diagnosis-item">
                <div class="diagnosis-box">
                  {{ carInfo.accidentHistory }} 건
                </div>
                사고이력
              </div>

              <div class="diagnosis-item">
                <div class="diagnosis-box">
                  {{ carInfo.inundationHistory ? 'YES' : 'NO' }}
                </div>
                침수이력
              </div>
            </div>
          </div>
        </v-card-item>

        <div>
          <v-card-item>
            <div>
              <table class="car-info-table">
                <tr>
                  <td class="font-weight-bold">구동방식</td>
                  <td class="my-value">{{ carInfo.drivingMethod }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">변속기</td>
                  <td class="my-value">{{ carInfo.transmission }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">연료</td>
                  <td class="my-value">{{ carInfo.fuel }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">배기량</td>
                  <td class="my-value">{{ carInfo.displacement }}cc</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">연비</td>
                  <td class="my-value">{{ carInfo.fuelEfficiency }} KM/L</td>
                </tr>
              </table>
            </div>
          </v-card-item>
          <v-card>
            <v-card-item>
              <div class="d-flex justify-space-between performance-checker">
                <div class="d-flex align-center">
                  <PerformanceCheckIcon
                    style="margin-right: 1em"
                  ></PerformanceCheckIcon>
                  <div class="d-flex flex-column justify-center">
                    <div style="font-size: 0.1em; font-weight: bold">
                      IWC가 보장하는
                    </div>
                    <div style="font-size: 1em; font-weight: bold">
                      성능 점검표 확인
                    </div>
                  </div>
                </div>
                <div style="font-size: 4em; margin-right: 0.2em">⇲</div>
              </div>
            </v-card-item>
          </v-card>
          <br />
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import PerformanceCheckIcon from './PerformanceCheckIcon.vue';
import DownloadIcon from './DownloadIcon.vue';

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);
</script>

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

.car-info-table tr {
  height: 2em;
}

.my-value {
  font-weight: bold;
  color: #888;
}

.w-3 {
  width: 3em;
}

.performance-checker:hover {
  cursor: pointer;
}
</style>
