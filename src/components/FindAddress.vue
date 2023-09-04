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
      @change="$emit('changeZipCode', zipCode)"
    >
    </v-text-field>

    <v-text-field
      label="주소"
      density="compact"
      variant="underlined"
      class="my-1"
      :readonly="true"
      v-model="address"
      @change="$emit('changeAddress', address)"
    >
    </v-text-field>

    <v-text-field
      label="상세주소"
      density="compact"
      clearable
      variant="underlined"
      class="mb-3"
      v-model="addressDetail"
      v-model="addressDetail"
      @change="$emit('changeAddressDetail', addressDetail)"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const myTrue = ref('true');

const emit = defineEmits([
  'changeMeetingDate',
  'changeZipCode',
  'changeAddress',
  'changeAddressDetail',
]);

const meetingDate = ref('');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

watch(meetingDate, (meetingDate) => emit('changeMeetingDate', meetingDate));
watch(zipCode, (zipCode) => emit('changeZipCode', zipCode));
watch(address, (address) => emit('changeAddress', address));
watch(addressDetail, (ad) => emit('changeAddressDetail', ad));

const findAddress = () => {
  new daum.Postcode({
    oncomplete: (data) => {
      zipCode.value = data.zonecode;
      address.value = data.address;
    },
  }).open();
};
</script>

<style lang="scss" scoped></style>
