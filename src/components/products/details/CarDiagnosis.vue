<template>
  <v-sheet class="mt-5" elevation="2">
    <v-card-title class="font-weight-bold text-h6 text-sm-h5 py-5">
      차량 진단서 ⭐️⭐️⭐️
    </v-card-title>
    <v-divider></v-divider>

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

              <div class="diagnosis-item mt-5">
                <div class="diagnosis-box">
                  {{ carInfo.accidentHistory }} 건
                </div>
                사고이력
              </div>

              <div class="diagnosis-item mt-5">
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
                  <v-chip
                    class="ma-2 font-weight-bold"
                    variant="outlined"
                    color="indigo-lighten-2"
                  >
                    <td class="my-value">
                      {{ carInfo.drivingMethod }}
                    </td>
                  </v-chip>
                </tr>
                <tr>
                  <td class="font-weight-bold">변속기</td>
                  <v-chip
                    class="ma-2 font-weight-bold"
                    variant="outlined"
                    color="indigo-lighten-2"
                  >
                    <td class="my-value">{{ carInfo.transmission }}</td>
                  </v-chip>
                </tr>
                <tr>
                  <td class="font-weight-bold">연료</td>
                  <v-chip
                    class="ma-2 font-weight-bold"
                    variant="outlined"
                    color="indigo-lighten-2"
                  >
                    <td class="my-value">{{ carInfo.fuel }}</td>
                  </v-chip>
                </tr>
                <tr>
                  <td class="font-weight-bold">배기량</td>
                  <v-chip
                    class="ma-2 font-weight-bold"
                    variant="outlined"
                    color="indigo-lighten-2"
                  >
                    <td class="my-value">{{ carInfo.displacement }}cc</td>
                  </v-chip>
                </tr>
                <tr>
                  <td class="font-weight-bold">연비</td>
                  <v-chip
                    class="ma-2 font-weight-bold"
                    variant="outlined"
                    color="indigo-lighten-2"
                  >
                    <td class="my-value">{{ carInfo.fuelEfficiency }} KM/L</td>
                  </v-chip>
                </tr>
              </table>
            </div>
          </v-card-item>

          <v-card>
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
              <div style="font-size: 3em; margin-right: 0.2em">⇲</div>
            </div>
          </v-card>
          <br />
        </div>
      </div>
    </v-card-item>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import PerformanceCheckIcon from './PerformanceCheckIcon.vue';

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);
</script>

<style lang="scss" scoped>
.diagnosis {
  max-width: 400px;
}

.diagnosis-item {
  text-align: center;
  font-weight: bold;
  margin-right: 0.5em;
  margin-bottom: 1em;
}

.diagnosis-box {
  display: flex;
  border: 2px solid black;
  border-radius: 6px;
  width: 150px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3em;
  font-size: 20px;
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
}

.w-3 {
  width: 3em;
}

.performance-checker:hover {
  cursor: pointer;
}
</style>
