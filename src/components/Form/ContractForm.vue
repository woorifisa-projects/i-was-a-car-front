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

    <v-dialog v-model="tradeDialog" width="800">
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-5"
          variant="outlined"
          @click="showDialog"
          :elevation="0"
          block
          v-bind="props"
        >
          매매 계약서 세부 사항 확인
        </v-btn>
      </template>

      <v-card>
        <AgreementCheck :contract="tradeContract"></AgreementCheck>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="[(tradeDialog = false), (tradeAgreeRadio = 'disagree')]"
          >
            동의 안 함
          </v-btn>
          <v-btn
            color="black"
            variant="outlined"
            @click="[(tradeDialog = false), (tradeAgreeRadio = 'agree')]"
          >
            동의 하기
          </v-btn>
        </v-card-actions>
      </v-card>
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

    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-5"
          variant="outlined"
          @click="showDialog"
          :elevation="0"
          block
          v-bind="props"
        >
          환불 약관
        </v-btn>
      </template>

      <v-card>
        <AgreementCheck :contract="refundContract"></AgreementCheck>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="[(dialog = false), (agreeRadio = 'disagree')]"
          >
            동의 안 함
          </v-btn>
          <v-btn
            color="black"
            variant="outlined"
            @click="[(dialog = false), (agreeRadio = 'agree')]"
          >
            동의 하기
          </v-btn>
        </v-card-actions>
      </v-card>
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
import { ref, onBeforeMount } from 'vue';
import { findContractById } from '@/apis/service/contracts/contractApi.js';
import AgreementCheck from '@/components/contract/AgreementCheck.vue';
import { watch } from 'vue';
import { useBtnStore } from '@/store/btnStore.js';
import { storeToRefs } from 'pinia';

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
const tradeDialog = ref(false);

const agreeRadio = ref('disagree');
const dialog = ref(false);
const showDialog = ref();

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

watch((tradeAgreeRadio, agreeRadio), () => {
  if (tradeAgreeRadio.value === 'agree' && agreeRadio.value === 'agree') {
    setBtnCondition(true);
  }
});
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
