<template>
  <v-container>
    <v-sheet
      :key="imgSliderRenderKey"
      class="d-flex justify-space-around flex-wrap align-end"
    >
      <div class="w-50">
        <Suspense><ImageSlider :carImages="carImages"></ImageSlider></Suspense>
      </div>
      <div class="w-50 d-flex flex-column align-center justify-center">
        <ImageAttach
          ref="imageRef"
          :images="imageList"
          :attachName="attachName"
          @changeFiles="addImages"
          @deleteImage="deleteProductImage"
        ></ImageAttach>
        <div class="w-100 d-flex justify-space-around align-center">
          <v-btn width="200" variant="outlined" size="x-large" @click="goBack"
            >뒤로</v-btn
          >
          <v-btn
            @click="uploadImageFiles"
            width="200"
            color="black"
            size="x-large"
            :disabled="imgDisable"
            >사진 업로드</v-btn
          >
        </div>
      </div>
    </v-sheet>
    <br />

    <br />

    <v-divider></v-divider>

    <Suspense>
      <MemberInfo :productHistory="productHistory"></MemberInfo>
    </Suspense>
    <br />
    <Suspense>
      <UpdateCarInfo :productHistory="productHistory"></UpdateCarInfo>
    </Suspense>
    <Suspense>
      <CarDiagnosis :carInfo="carInfo"></CarDiagnosis>
    </Suspense>
    <br />

    <Suspense>
      <MileageAnalysis :carInfo="carInfo"></MileageAnalysis>
    </Suspense>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  findProductDetail,
  findProductHistory,
  uploadImages,
} from '@/apis/admin/products/productAPI.js';
import { changeFiles, deleteImage } from '@/utils';

import ImageAttach from '@/components/common/ImageAttach.vue';
import { watch } from 'vue';

const router = useRouter();

const carImages = ref([]);
const carInfo = ref({});
const productHistory = ref([]);
const imageRef = ref([]);
const imageList = ref([]);
const imageData = ref({});
const attachName = ref('hello');

const imgSliderRenderKey = ref(0);
const imgDisable = ref(true);

const addImages = (files) => {
  changeFiles(files, imageRef, imageList, imageData);
};

const deleteProductImage = (idx) =>
  deleteImage(idx, imageRef, imageList, imageData);

let ImageSlider;
let MemberInfo;
let UpdateCarInfo;
let CarDiagnosis;
let MileageAnalysis;

onBeforeMount(async () => {
  try {
    const route = useRoute();
    const response = await findProductDetail(route.params.id);
    const productHistoryRes = await findProductHistory(route.params.id);
    const item = response.data.data;
    const item1 = productHistoryRes.data.data;
    carInfo.value = item;
    carImages.value = item.images;
    productHistory.value = item1;

    ImageSlider = defineAsyncComponent(() =>
      import('@/components/products/details/ImageSlider.vue')
    );
    UpdateCarInfo = defineAsyncComponent(() =>
      import('@/components/admin/products/UpdateCarInfo.vue')
    );
    MemberInfo = defineAsyncComponent(() =>
      import('@/components/admin/products/MemberInfo.vue')
    );
    CarDiagnosis = defineAsyncComponent(() =>
      import('@/components/products/details/CarDiagnosis.vue')
    );
    MileageAnalysis = defineAsyncComponent(() =>
      import('@/components/products/details/MileageAnalysis.vue')
    );
  } catch (e) {
    console.error(e);
  }
});

const route = useRoute();
const uploadImageFiles = async () => {
  try {
    const formData = new FormData();

    Array.from(imageRef.value.input.files).forEach((file) => {
      formData.append('images', file);
    });

    await uploadImages(carInfo.value.id, formData);
  } catch (e) {
    console.error('uploadImageFiles: ', e);
  } finally {
    const response = await findProductDetail(route.params.id);
    const item = response.data.data;
    carImages.value = item.images;
    imageList.value = [];
    imgSliderRenderKey.value += 1;
  }
};

watch([imageList], () => {
  if (imageList.value.length > 0) {
    imgDisable.value = false;
  } else {
    imgDisable.value = true;
  }
});
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
