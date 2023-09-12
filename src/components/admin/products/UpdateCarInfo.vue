<template>
  <v-card>
    <v-card-title class="font-weight-bold text-h5 py-5">수정 사항</v-card-title>
    <v-divider></v-divider>

    <v-card-item>
      <div class="d-flex">
        <div style="width: 50%">
          <v-card-item>
            <v-card-text class="font-bold pl-0">심사 단계</v-card-text>
            <div v-for="(item, index) in labels" :key="index">
              <input
                class="mr-2 mb-5"
                type="radio"
                :value="item.id"
                v-model="selected"
              />
              <span class="font-weight-medium">
                {{ item.name }}
              </span>
            </div>
          </v-card-item>
        </div>

        <div
          style="width: 50%"
          class="d-flex flex-column justify-space-between"
        >
          <v-card-item>
            <v-card-text class="font-bold pl-0"> 판매 가격 </v-card-text>
            <div style="display: flex; align-items: center">
              <v-text-field
                v-model="price"
                suffix="만원"
                autofocus
                variant="outlined"
                style="font-weight: 900"
              >
              </v-text-field>
            </div>
          </v-card-item>

          <BtnBlack
            class="align-self-end mr-4"
            :msg="'정보수정'"
            @click="uploadInfo"
          ></BtnBlack>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import {
  findLabels,
  updatePriceAndLabel,
} from '@/apis/admin/products/productAPI';
import BtnBlack from '@/components/common/BtnBlack.vue';

const labels = ref([]);
const selected = ref(null);
const props = defineProps(['productHistory']);
const productHistory = ref(props.productHistory);
const month = ref('');
const monthlyPrice = ref(0);

const price = ref(productHistory.value.price / 10000);

watch(month, (m) => {
  const howLong = m.substring(0, 2);
  monthlyPrice.value =
    (installment.value + installment.value * 0.035) / howLong;
});

const findLabelData = async () => {
  try {
    const response = await findLabels();

    labels.value = response.data.data;

    const matchingItem = labels.value.find(
      (item) => item.name === productHistory.value.label
    );

    if (matchingItem) {
      selected.value = matchingItem.id;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  findLabelData();
});

const uploadInfo = async () => {
  const actualPrice = price.value * 10000;
  try {
    const response = await updatePriceAndLabel(
      productHistory.value.id,
      actualPrice,
      selected.value
    );
    price.value = response.data.data.price / 10000;
    selected.value = response.data.data.labelId;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<style lang="scss" scoped>
.w-30 {
  width: 30em;
}

.font-bold {
  font-weight: bold;
  font-size: 1.3em;
}

.my-highlight {
  font-size: 1.5em;
  color: #0057ff;
}

.btn-design {
  width: 7em;
  height: 3.5em;
  margin: 1em 0;
}

.btn-selected {
  border: 5px solid blue;
}
</style>
