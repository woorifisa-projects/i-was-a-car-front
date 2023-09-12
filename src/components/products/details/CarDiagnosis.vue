<template>
  <v-sheet class="mt-5" elevation="2">
    <v-card-title class="font-weight-bold text-h6 text-sm-h5 py-5">
      차량 진단서
    </v-card-title>
    <v-divider></v-divider>

    <v-card-item>
      <div class="d-flex justify-space-around align-center flex-wrap">
        <v-card-item
          class="d-flex justify-space-between align-center diagnosis"
        >
          <div class="d-flex flex-wrap justify-space-between">
            <div class="diagnosis-item ma-2">
              <div class="diagnosis-box">
                {{ new Date(Date.parse(carInfo.year)).getFullYear() }}년식
              </div>
              연식
            </div>

            <div class="diagnosis-item ma-2">
              <div class="diagnosis-box">
                {{ carInfo.distance.toLocaleString() }} KM
              </div>
              주행거리
            </div>

            <div class="diagnosis-item ma-2">
              <div class="diagnosis-box">{{ carInfo.accidentHistory }} 건</div>
              사고이력
            </div>

            <div class="diagnosis-item ma-2">
              <div class="diagnosis-box">
                {{ carInfo.inundationHistory ? 'YES' : 'NO' }}
              </div>
              침수이력
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
            <div
              v-if="carInfo.performanceCheck"
              @click="dialog = true"
              class="d-flex justify-space-between performance-checker"
            >
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
              <template v-else>
                <div>
                  <v-file-input
                    v-model="file"
                    label="파일 등록하기"
                    variant="outlined"
                    density="dense"
                    >{{ carInfo.performanceCheck }}</v-file-input
                  >
                  <BtnBlack :msg="'업로드'" @click="uploadFile"></BtnBlack>
                </div>
              </template>
          </v-card>

          <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
          >
            <v-card class="bg-black">
              <v-toolbar color="black">
                <v-btn icon @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-subtitle-1 font-weight-bold"
                  >성능정검표 확인</v-toolbar-title
                >
              </v-toolbar>

              <v-img :src="carInfo.performanceCheck"></v-img>
            </v-card>
          </v-dialog>

          <br />
        </div>
      </div>
    </v-card-item>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import PerformanceCheckIcon from './PerformanceCheckIcon.vue';
import BtnBlack from '@/components/common/BtnBlack.vue';
import { addPerformanceCheck } from '@/apis/admin/products/productAPI';

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);

const dialog = ref(false);

const file = ref(null);
const uploadFile = async () => {
  if (file.value) {
    const formData = new FormData();
    formData.append('performanceCheck', file.value[0]);
    try {
      const response = await addPerformanceCheck(carInfo.value.id, formData);
      console.log('File uploaded successfully');
      carInfo.value.performanceCheck = response.data.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('No file selected');
  }
};
</script>

<style lang="scss" scoped>
.diagnosis {
  max-width: 280px;
}

.diagnosis-item {
  text-align: center;
  font-weight: bold;
}

.diagnosis-box {
  text-align: center;
  display: flex;
  border: 1px solid black;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3em;
  font-size: 16px;
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
