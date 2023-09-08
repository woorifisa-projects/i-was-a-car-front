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
      @click="findAddress"
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
      @change="$emit('changeAddressDetail', addressDetail)"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const props = defineProps(['zipCode', 'address', 'addressDetail']);
const emit = defineEmits([
  'changeZipCode',
  'changeAddress',
  'changeAddressDetail',
]);

const zipCode = ref(props.zipCode == undefined ? '' : props.zipCode);
const address = ref(props.address == undefined ? '' : props.address);
const addressDetail = ref(props.addressDetail == undefined ? '' : props.addressDetail);

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
