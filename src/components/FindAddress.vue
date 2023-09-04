<template>
  <div>
    <v-text-field
      label="주소 찾기"
      density="compact"
      append-inner-icon="mdi-magnify"
      variant="underlined"
      :readonly="true"
      v-model="zipCode"
      @click="findAddress"
    >
    </v-text-field>

    <v-text-field
      label="주소"
      density="compact"
      variant="underlined"
      class="my-1"
      :readonly="true"
      v-model="address"
    >
    </v-text-field>

    <v-text-field
      label="상세주소"
      density="compact"
      clearable
      variant="underlined"
      class="mb-3"
      v-model="addressDetail"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const myTrue = ref('true');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

const findAddress = () => {
  new daum.Postcode({
    oncomplete: (data) => {
      zipCode.value = data.zonecode;
      address.value = data.address;

      console.log(zipCode.value, address.value);
    },
  }).open();
};
</script>

<style lang="scss" scoped></style>
