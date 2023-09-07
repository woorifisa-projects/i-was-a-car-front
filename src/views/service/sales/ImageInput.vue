<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <ImageAttach
      ref="imageRef"
      :images="imageList"
      :attachName="attachName"
      @changeFiles="addImages"
      @deleteImage="deleteProductImage"
    ></ImageAttach>
  </Card>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { changeFiles, deleteImage } from '@/utils';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { useValidateSaleStore } from '@/store/sales/saleValidateStore.js';

import Card from '@/components/card/Card.vue';
import ImageAttach from '@/components/common/ImageAttach.vue';
import { useBtnStore } from '@/store/btnStore';

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;
onBeforeMount(() => setBtnCondition(false));

const store = useSaleStore();
const { addStoreImages } = store;
const validateStore = useValidateSaleStore();
const { setImageInfoCheck } = validateStore;

const cardTitle = ref('사진 정보 입력');
const next = ref('다음');
const nextUrl = ref('6');
const imageRef = ref([]);
const imageList = ref([]);
const imageData = ref({});
const attachName = ref('hello');

const addImages = (files) => changeFiles(files, imageRef, imageList, imageData);

const deleteProductImage = (idx) =>
  deleteImage(idx, imageRef, imageList, imageData);

const onClickNextBtnEmit = () =>
  addStoreImages(Array.from(imageRef.value.input.files));

watch(imageList, (i) => {
  const value =
    imageRef.value.input.files != null &&
    Array.from(imageRef.value.input.files).length > 0;
  setImageInfoCheck(value);
  setBtnCondition(value);
});
</script>

<style lang="scss" scoped></style>
