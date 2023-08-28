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

        <v-form @submit.prevent>
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
            class="mb-1 pr-6 d-flex justify-end"
            density="compact"
            value="true"
            style="height: 40px"
            @update="toggleAllCheckboxes"
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
            v-model="selected[0]"
            density="compact"
            append-icon="mdi-chevron-right"
            class="checkbox-label"
            style="height: 40px"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 서비스 이용약관 (필수)</span
              >
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected[1]"
            density="compact"
            append-icon="mdi-chevron-right"
            class="checkbox-label"
            style="height: 40px"
          >
            <template v-slot:label>
              <span class="custom-font-size">
                I was a car 개인정보 수집 및 이용 동의 (필수)</span
              >
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="selected[2]"
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
          >다음</v-btn
        >
      </v-sheet>
      {{ selected }}
      ALL: {{ selectedAll }}
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const selected = ref([false, false, false]);
const selectedAll = ref(false);

const toggleAllCheckboxes = () => {
  const newState = selectedAll.value;

  if (newState) {
    selected.value = [true, true, true];
  } else
    for (let i = 0; i < selected.value.length; i++) {
      selected.value[i] = newState;
    }
};

watch(selected.value, (newState) => {
  console.log(newState);
  const filterTrue = newState.filter((value) => value);
  if (filterTrue.length === 3) {
    selectedAll.value = true;
  } else {
    selectedAll.value = false;
  }
});

// const selected = ref([]);

// const selectedAll = ref(false);

// watch(selectedAll, (newValue) => {
//   if (newValue) {
//     selected.value = ['item1', 'item2', 'item3'];
//   } else {
//     selected.value = [];
//   }
// });

// watch(selected, (newSelected) => {
//   if (newSelected.length !== 3) {
//     selectedAll.value = false;
//   }
// });
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
</style>
