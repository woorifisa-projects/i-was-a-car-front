<template>
  <v-form @submit.prevent>
    <v-text-field
      label="이름"
      density="compact"
      clearable
      variant="underlined"
      class="mb-10"
    ></v-text-field>

    <div class="d-flex flex-row justify-space-around my-16">
      <v-text-field
        label="주민등록번호 앞자리"
        density="compact"
        clearable
        variant="underlined"
      ></v-text-field>
      <div class="align-self-center mx-8">-</div>
      <v-text-field
        :type="passwordVisible ? 'text' : 'password'"
        density="compact"
        label="주민등록번호 뒷자리"
        @click:append-inner="passwordVisible = !passwordVisible"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        variant="underlined"
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
        >
          개인 정보 수집 동의 약관 확인 하기
        </v-btn>
      </template>

      <v-card>
        <Suspense
          ><AgreementCheck :contract="contract"></AgreementCheck
        ></Suspense>

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
      <div class="align-self-center">약관 동의</div>
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

const agreeRadio = ref('disagree');
const dialog = ref(false);
const passwordVisible = ref(false);

const contractId = 5;
const contract = ref([]);

onBeforeMount(async () => {
  try {
    const response = await findContractById(contractId);
    contract.value = response.data.data;
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
