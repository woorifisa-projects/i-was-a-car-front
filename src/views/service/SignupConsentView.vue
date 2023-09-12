<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      width="500"
      height="690"
      class="mt-2 rounded-xl d-flex flex-column align-center"
      :elevation="xs ? 0 : 4"
    >
      <v-card-title class="text-center text-h5 font-weight-black ma-8"
        >약관 동의</v-card-title
      >
      <v-sheet width="500" class="mx-auto d-flex flex-column align-center">
        <div class="d-flex justify-center w-80">
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            src="@/assets/images/iwasacar.png"
          ></v-img>
        </div>

        <div class="d-flex justify-center mt-5 mb-5">
          <div class="text-sm">
            <b>
              <p class="mt-3">
                I was a car에서 제공하는 편리한 금융 서비스를 <br />
                간편하게 이용해 보세요.
              </p>
            </b>
          </div>
        </div>

        <v-form @submit.prevent v-model="isVerifyAuthentication">
          <v-divider
            mx-auto
            length="800"
            thickness="3"
            class="mb-5"
            align-center
          ></v-divider>

          <v-checkbox
            v-model="selectedAll"
            id="all-consent"
            class="mb-1 pr-6 d-flex justify-end checkbox-label"
            density="compact"
            @update:model-value="toggleAllCheckboxes"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <label
                  for="all-consent"
                  style="width: 50px"
                  class="custom-font-size"
                  >모두 동의</label
                >
              </div>
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected.one"
            density="compact"
            class="checkbox-label"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 서비스 이용약관 (필수)</span
              >
            </template>

            <template v-slot:append>
              <v-icon @click="toggeDialogOne">mdi-chevron-right</v-icon>

              <Dialog
                :number="'one'"
                :dialog="dialogOne"
                :xs="xs"
                :items="serviceData"
                @agreeEvent="agreeHandler"
                @disagreeEvent="disagreeHandler"
              >
              </Dialog>
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected.two"
            density="compact"
            class="checkbox-label"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 개인정보 수집 및 이용 동의 (필수)</span
              >
            </template>

            <template v-slot:append>
              <v-icon @click="toggeDialogTwo">mdi-chevron-right</v-icon>

              <Dialog
                :number="'two'"
                :dialog="dialogTwo"
                :xs="xs"
                :items="personalInfoData"
                @agreeEvent="agreeHandler"
                @disagreeEvent="disagreeHandler"
              >
              </Dialog>
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected.three"
            :required="false"
            density="compact"
            class="checkbox-label"
            style="height: 40px"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 마케팅 활용 서비스 수신 동의(선택)</span
              >
            </template>

            <template v-slot:append>
              <v-icon @click="toggeDialogThree">mdi-chevron-right</v-icon>
              <Dialog
                :number="'three'"
                :dialog="dialogThree"
                :xs="xs"
                :items="marketingData"
                @agreeEvent="agreeHandler"
                @disagreeEvent="disagreeHandler"
              >
              </Dialog>
            </template>
          </v-checkbox>
        </v-form>
      </v-sheet>
      <v-sheet width="320" class="d-flex justify-space-between mt-9">
        <v-btn width="120" height="40" to="/email">이전</v-btn>
        <v-btn
          :disabled="isVerifyAuthentication"
          width="120"
          height="40"
          class="bg-black"
          to="/signup"
          @click="consentPost"
          >다음</v-btn
        >
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import Dialog from '@/components/service/Dialog.vue';
import { findContractById } from '@/apis/service/contracts/contractApi';
import { onBeforeMount } from 'vue';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useContractStore } from '@/store/contractStore';

const contractStore = useContractStore();
const {
  setContract,
  setMarketingContract,
  setIsConsent,
  setIsConsentMarketing,
  resetRequest,
} = contractStore;

const dialogOne = ref(false);

const dialogTwo = ref(false);

const dialogThree = ref(false);

const toggeDialogOne = () => {
  dialogOne.value = !dialogOne.value;
};

const toggeDialogTwo = () => {
  dialogTwo.value = !dialogTwo.value;
};

const toggeDialogThree = () => {
  dialogThree.value = !dialogThree.value;
};

const { xs } = useDisplay();

const selected = ref({
  one: false,
  two: false,
  three: false,
});

const selectedAll = ref(false);

const isVerifyAuthentication = ref(false);

const serviceData = ref([]);

const personalInfoData = ref([]);

const marketingData = ref([]);

const agreeHandler = (value) => {
  if (value === 'one') {
    selected.value.one = true;
    toggeDialogOne();
  } else if (value === 'two') {
    selected.value.two = true;
    toggeDialogTwo();
  } else if (value === 'three') {
    selected.value.three = true;
    toggeDialogThree();
    setIsConsentMarketing(true);
  }
};

const disagreeHandler = (value) => {
  if (value === 'one') {
    selected.value.one = false;
    toggeDialogOne();
  } else if (value === 'two') {
    selected.value.two = false;
    toggeDialogTwo();
  } else if (value === 'three') {
    selected.value.three = false;
    toggeDialogThree();
    setIsConsentMarketing(false);
  }
};

const toggleAllCheckboxes = () => {
  const newState = selectedAll.value;

  if (newState) {
    selected.value.one = true;
    selected.value.two = true;
    selected.value.three = true;
  } else {
    selected.value.one = false;
    selected.value.two = false;
    selected.value.three = false;
  }
};

watch(selected.value, (newState) => {
  const filterTrue = Object.values(newState).filter((state) => state);

  if (selected.value.one && selected.value.two && filterTrue.length < 3) {
    isVerifyAuthentication.value = false;
    setIsConsent(true);
    selectedAll.value = false;
  } else if (filterTrue.length === 3) {
    selectedAll.value = true;
    setIsConsent(true);
    setIsConsentMarketing(true);
  } else {
    isVerifyAuthentication.value = true;
    selectedAll.value = false;
    setIsConsent(false);
    setIsConsentMarketing(false);
  }
});

const getService = async () => {
  const { data } = await findContractById(1);
  return data.data;
};

const getPersonalInfo = async () => {
  const { data } = await findContractById(3);
  return data.data;
};

const getMarketing = async () => {
  const { data } = await findContractById(4);
  return data.data;
};

onBeforeMount(async () => {
  try {
    const [serviceResp, personalInfoResp, marketingResp] = await Promise.all([
      getService(),
      getPersonalInfo(),
      getMarketing(),
    ]);

    resetRequest();

    serviceData.value = serviceResp;
    setContract(serviceData.value);

    personalInfoData.value = personalInfoResp;
    setContract(personalInfoData.value);

    marketingData.value = marketingResp;
    setMarketingContract(marketingData.value);
  } catch (e) {
    console.error('동의항목 API 호출: ', e);
  }
});
</script>

<style scoped>
.text-sm {
  text-align: center;
  font-size: 15px;
}

.text-color-black {
  color: black;
}

.custom-font-size {
  font-size: 13px;
}

.checkbox-label {
  height: 40px;
}

.scrollable-content {
  max-height: calc(100% - 160px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }
}

.fixed-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 5px;
}

.black-btn {
  background-color: black !important;
  color: white !important;
}
</style>
