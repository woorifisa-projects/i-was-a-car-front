<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      width="500"
      height="690"
      class="mt-5 rounded-xl d-flex flex-column align-center"
      :elevation="4"
    >
      <v-card-title class="text-center text-h5 ma-8">약관 동의</v-card-title>
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
            append-icon="mdi-chevron-right"
            class="checkbox-label"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 서비스 이용약관 (필수)</span
              >
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected.two"
            density="compact"
            append-icon="mdi-chevron-right"
            class="checkbox-label"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 개인정보 수집 및 이용 동의 (필수)</span
              >
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected.three"
            :required="false"
            density="compact"
            class="checkbox-label"
            append-icon="mdi-chevron-right"
            style="height: 40px"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 마케팅 활용 서비스 수신 동의(선택)</span
              >
            </template>
          </v-checkbox>
        </v-form>
      </v-sheet>
      <v-sheet width="320" class="d-flex justify-space-between mt-9">
        <v-btn width="120" height="40">이전</v-btn>
        <v-btn
          :disabled="isVerifyAuthentication"
          width="120"
          height="40"
          class="bg-black"
          @click="nagivateToSignup"
          >다음</v-btn
        >
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import router from '@/router';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const selected = ref({
  one: false,
  two: false,
  three: false,
});

const selectedAll = ref(false);
const isVerifyAuthentication = ref(false);

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
  if (selected.value.one && selected.value.two) {
    isVerifyAuthentication.value = false;
  } else if (filterTrue.length === 3) {
    selectedAll.value = true;
  } else {
    isVerifyAuthentication.value = true;
    selectedAll.value = false;
  }
});

const nagivateToSignup = () => {
  router.push('/signup');
};
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
</style>
