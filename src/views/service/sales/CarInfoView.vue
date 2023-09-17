<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <div
      v-if="!isLoaded"
      style="height: 20em"
      class="d-flex flex-column justify-center align-center"
    >
      <v-card-title style="font-size: 1.5em">차량 조회 중</v-card-title>
      <br />
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
    <div v-else class="d-flex flex-column align-center">
      <img :src="imgUrl" class="main-img" />
      <br />
      <div>
        {{ carInfo.info }}
      </div>
      <div>
        <v-sheet
          class="mx-auto"
          elevation="0"
          color="rgba(0,0,0,0)"
          max-width="450"
        >
          <v-slide-group
            v-model="model"
            class="pa-1"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="(item, index) in infos"
              :key="index"
              v-slot="{ toggle }"
            >
              <div class="d-flex flex-column align-center">
                <v-card
                  color="grey-lighten-1"
                  :class="['ma-3']"
                  height="100"
                  width="100"
                  elevation="0"
                  @click="toggle"
                >
                  <div class="d-flex fill-height align-center justify-center">
                    {{ item.content }}
                  </div>
                </v-card>
                <div>
                  <v-card-subtitle>
                    {{ item.contentName }}
                  </v-card-subtitle>
                </div>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRetrieveCarStore } from '@/store/retrieveCar/retrieveCar.js';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { findProductByNameAndCarNumber } from '@/apis/service/products/productApi.js';
import { storeToRefs } from 'pinia';
import { useBtnStore } from '@/store/btnStore.js';

import Card from '@/components/card/Card.vue';

const carStore = useRetrieveCarStore();
const { getCarInfo } = carStore;
const info = storeToRefs(getCarInfo());
const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const saleStore = useSaleStore();
const { combineResponse } = saleStore;

const carInfo = ref({});

onBeforeMount(() => {
  const { request } = storeToRefs(saleStore);
  carInfo.value = request.value;
  setBtnCondition(request.value.carName !== undefined);
});

const model = ref();
const cardTitle = ref('차량정보');
const next = ref('다음');
const nextUrl = ref('4');
const carNumber = ref(carInfo.value.info);
const infos = ref([]);
const isLoaded = ref(carInfo.value.images !== undefined);
const imgUrl = ref(
  carInfo.value.images === undefined ? null : carInfo.value.images[0]
);

const addInfo = (carInfo) => {
  infos.value.push(
    ...[
      {
        contentName: '소유자',
        content: carInfo.value.memberName,
      },
      {
        contentName: '차명',
        content: carInfo.value.carName,
      },
      {
        contentName: '연식',
        content: `${carInfo.value.year.split('-')[0]}년식`,
      },
      {
        contentName: '차종',
        content: carInfo.value.carType,
      },
      {
        contentName: '색상',
        content: carInfo.value.color,
      },
      {
        contentName: '배기량',
        content: `${carInfo.value.displacement}`,
      },
      {
        contentName: '연료',
        content: carInfo.value.fuel,
      },
      {
        contentName: '연비',
        content: `${carInfo.value.fuelEfficiency} KM/l`,
      },
      {
        contentName: '구동방식',
        content: carInfo.value.drivingMethod,
      },
    ]
  );
};

if (carInfo.value.carName === undefined) {
  findProductByNameAndCarNumber(info.name.value, info.carNumber.value)
    .then((resp) => {
      setBtnCondition(true);
      isLoaded.value = true;
      carInfo.value = resp.data.data;

      imgUrl.value = carInfo.value.images[0];
      carNumber.value = carInfo.value.info;
      addInfo(carInfo);
    })
    .catch((e) => console.error(e));
} else {
  addInfo(carInfo);
}

const onClickNextBtnEmit = () => combineResponse(carInfo.value);
</script>

<style lang="scss" scoped>
.main-img {
  width: 200px;
  max-height: 200px;
  object-fit: cover;
  margin: 0 auto;
}
</style>
