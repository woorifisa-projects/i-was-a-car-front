<template>
  <ProgressSprinner v-if="isLoading" />

  <template v-else>
    <v-form @submit.prevent>
      <v-text-field
        label="이름"
        density="compact"
        variant="underlined"
        class="mb-10"
        :readonly="true"
        v-model="targetName"
      ></v-text-field>
      <div class="d-flex flex-row justify-space-around my-16">
        <v-text-field
          label="주민등록번호 앞자리"
          type="number"
          density="compact"
          variant="underlined"
          :readonly="true"
          v-model="targetRrnf"
          class="w-0"
          single-line
          hide-details
        ></v-text-field>
        <div class="align-self-center mx-4">-</div>
        <v-text-field
          :type="passwordVisible ? 'password' : 'text'"
          density="compact"
          label="주민등록번호 뒷자리"
          :hide-details="passwordVisible"
          @click:append-inner="passwordVisible = !passwordVisible"
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          variant="underlined"
          v-model="targetRrnb"
          @keypress="isNumber"
          class="w-13"
        ></v-text-field>
      </div>
      <v-divider></v-divider>
      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
          <v-btn
            class="mb-5 mt-10"
            variant="outlined"
            @click="showDialog"
            :elevation="0"
            block
            v-bind="props"
            :disabled="radioReadOnly"
          >
            개인 정보 수집 동의 약관 확인하기
          </v-btn>
        </template>
        <Suspense
          ><Dialog
            :dialog="dialog"
            :xs="xs"
            :items="contract"
            :number="'one'"
            @agreeEvent="agreeHandler"
            @disagreeEvent="disagreeHandler"
          ></Dialog
        ></Suspense>
      </v-dialog>
      <div class="d-flex justify-space-between align-content-center">
        <div class="align-self-center font-weight-medium">약관 동의</div>
        <div>
          <v-radio-group
            class="w-30 d-flex align-center"
            v-model="agreeRadio"
            inline
            row
            :readonly="radioReadOnly"
          >
            <v-radio label="동의" value="agree"></v-radio>
            <v-radio label="동의 안함" value="disagree"></v-radio>
          </v-radio-group>
        </div>
      </div>
    </v-form>
  </template>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { findContractById } from '@/apis/service/contracts/contractApi.js';
import Dialog from '@/components/service/Dialog.vue';
import ProgressSprinner from '../common/ProgressSprinner.vue';

import { useBtnStore } from '@/store/btnStore';
import { useAuthStore } from '@/store/auth';
import { useContractStore } from '@/store/contractStore';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useLoadingStore } from '@/store/loading';

const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

const contractStore = useContractStore();
const { radioReadOnly } = storeToRefs(contractStore);
const { setContract, setIsConsent, resetRequest } = contractStore;

const btnStore = useBtnStore();
const { setBtnCondition, setisBasicInfo } = btnStore;

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);
const { setRrnb } = authStore;

const agreeRadio = ref('disagree');
const dialog = ref(false);
const passwordVisible = ref(true);
const { xs } = useDisplay();

const toggeDialog = () => {
  dialog.value = !dialog.value;
};

const agreeHandler = (value) => {
  if (value === 'one') {
    agreeRadio.value = 'agree';
    setIsConsent(true);
    toggeDialog();
  }
};

const disagreeHandler = (value) => {
  if (value === 'one') {
    agreeRadio.value = 'disagree';
    toggeDialog();
  }
};

const contractId = 5;
const contract = ref([]);

const targetName = ref(authInfo.value.name);
const targetRrnf = ref(authInfo.value.birth);
const targetRrnb = ref();

watch([targetRrnb, agreeRadio], () => {
  if (!!targetRrnb.value && agreeRadio.value === 'agree') {
    setBtnCondition(true);
    setRrnb(targetRrnb.value);
    setIsConsent(true);
  } else {
    setBtnCondition(false);
  }
});

onBeforeMount(async () => {
  resetRequest();
  setBtnCondition(false);
  setisBasicInfo(true);
  try {
    const response = await findContractById(contractId);
    contract.value = response.data.data;
    setContract(contract.value);
  } catch (e) {
    console.error(e);
  }
});

const isNumber = (evt) => {
  const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const keyPressed = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
};
</script>

<style lang="scss" scoped></style>
