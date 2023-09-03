<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <ImageAttach
      ref="imageRef"
      :images="images"
      :attachName="attachName"
      @changeFiles="addImages"
      @deleteImage="deleteProductImage"
    ></ImageAttach>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { changeFiles, deleteImage } from '@/utils';
import { useSaleStore } from '@/store/sales/saleStore';
import Card from '@/components/card/Card.vue';
import ImageAttach from '@/components/common/ImageAttach.vue';

const store = useSaleStore();
const { addStoreImages } = store;

const cardTitle = ref('사진 정보 입력');
const next = ref('다음');
const nextUrl = ref('finance');
const imageRef = ref(null);
const images = ref([]);
const imageData = ref({});
const attachName = ref('hello');

const addImages = (files) => changeFiles(files, imageRef, images, imageData);

const deleteProductImage = (idx) =>
  deleteImage(idx, imageRef, images, imageData);

const onClickNextBtnEmit = () => addStoreImages(images.value);
</script>

<style lang="scss" scoped></style>
