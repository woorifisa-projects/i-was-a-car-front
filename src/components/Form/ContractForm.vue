<template>
  <v-form @submit.prevent>
    <v-container class="d-flex justify-space-between"
      ><div>
        자동차 양도인:
        <span class="change">{{ seller }}</span>
      </div>
      <div>||</div>
      <div>
        자동차 양수인:
        <span class="change">{{ buyer }}</span>
      </div></v-container
    >

    <table id="contract_table" style="width: 100%">
      <tr>
        <td class="contract-td-title">자동차 번호</td>
        <td class="change" style="font-size: 0.9rem">{{ carNumber }}</td>
        <td class="contract-td-title">차종</td>
        <td class="change">{{ carType }}</td>
      </tr>
      <tr>
        <td class="contract-td-title">차명</td>
        <td class="change">{{ carName }}</td>
        <td class="contract-td-title">연료</td>
        <td class="change">{{ fuel }}</td>
      </tr>
    </table>
    <br />

    <div style="text-align: center">
      본 자동차의 매매 금액: 총
      <span class="change" style="font-size: large">
        {{ (price / 10000).toLocaleString() }}
      </span>
      (만원)<br />「을」이 「갑」에게 다음과 같이 지급한다
    </div>

    <v-dialog v-model="dialogOne" width="800">
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-5"
          variant="outlined"
          :elevation="0"
          block
          v-bind="props"
        >
          매매 계약서 세부 사항 확인
        </v-btn>
      </template>

      <Dialog
        :dialog="dialogOne"
        :xs="xs"
        :items="tradeContract"
        :number="'one'"
        @agreeEvent="agreeHandler"
        @disagreeEvent="disagreeHandler"
      ></Dialog>
    </v-dialog>

    <div class="d-flex justify-space-between align-content-center">
      <div class="align-self-center">매매 계약서 확인 및 동의</div>
      <div>
        <v-radio-group
          class="w-30 d-flex align-center"
          v-model="tradeAgreeRadio"
          inline
          row
        >
          <v-radio label="동의" value="agree"></v-radio>
          <v-radio label="동의 안함" value="disagree"></v-radio>
        </v-radio-group>
      </div>
    </div>

    <v-dialog v-model="dialogTwo" width="800">
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-5"
          variant="outlined"
          :elevation="0"
          block
          v-bind="props"
          @click="dialogTwo"
        >
          환불 약관
        </v-btn>
      </template>

      <Dialog
        :dialog="dialogTwo"
        :xs="xs"
        :items="refundContract"
        :number="'two'"
        @agreeEvent="agreeHandler"
        @disagreeEvent="disagreeHandler"
      ></Dialog>
    </v-dialog>

    <div class="d-flex justify-space-between align-content-center">
      <div class="align-self-center">환불 약관 확인 및 동의</div>
      <div>
        <v-radio-group
          class="w-30 d-flex align-center"
          v-model="agreeRadio"
          inline
          row
        >
          <v-radio label="동의" value="agree"></v-radio>
          <v-radio label="동의 안함" value="disagree"></v-radio>
        </v-radio-group>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { findContractById } from '@/apis/service/contracts/contractApi.js';
import { useBtnStore } from '@/store/btnStore';
import { useDisplay } from 'vuetify/lib/framework.mjs';

import Dialog from '@/components/service/Dialog.vue';

const props = defineProps([
  'seller',
  'buyer',
  'price',
  'carNumber',
  'carName',
  'carType',
  'fuel',
  'enctype',
]);

const tradingContractId = 8;
const refundContractId = 7;

const tradeAgreeRadio = ref('disagree');
const agreeRadio = ref('disagree');
const dialogOne = ref(false);
const dialogTwo = ref(false);

/***** Props *****/
const seller = ref(props.seller);
const buyer = ref(props.buyer);
const price = ref(props.price);
const carNumber = ref(props.carNumber);
const carName = ref(props.carName);
const carType = ref(props.carType);
const fuel = ref(props.fuel);

const tradeContract = ref([]);
const refundContract = ref([]);

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

onBeforeMount(async () => {
  setBtnCondition(false);

  try {
    const traderesponse = await findContractById(tradingContractId);
    tradeContract.value = traderesponse.data.data;

    const refundresponse = await findContractById(refundContractId);
    refundContract.value = refundresponse.data.data;
  } catch (e) {
    console.error(e);
  }
});

watch([tradeAgreeRadio, agreeRadio], () => {
  if (tradeAgreeRadio.value === 'agree' && agreeRadio.value === 'agree') {
    setBtnCondition(true);
  }
});

const { xs } = useDisplay();

const toggeDialogOne = () => {
  dialogOne.value = !dialogOne.value;
};

const toggeDialogTwo = () => {
  dialogTwo.value = !dialogTwo.value;
};

const agreeHandler = (value) => {
  if (value === 'one') {
    tradeAgreeRadio.value = 'agree';
    toggeDialogOne();
  } else if (value === 'two') {
    agreeRadio.value = 'agree';
    toggeDialogTwo();
  }
};

const disagreeHandler = (value) => {
  if (value === 'one') {
    tradeAgreeRadio.value = 'disagree';
    toggeDialogOne();
  } else if (value === 'two') {
    agreeRadio.value = 'disagree';
    toggeDialogTwo();
  }
};
</script>

<style lang="scss" scoped>
table,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

td {
  width: 25%;
  text-align: center;
  padding: 1%;
}

.contract-td-title {
  background: #000;
  color: #fff;
}
.change {
  font-weight: bold;
}
</style>
