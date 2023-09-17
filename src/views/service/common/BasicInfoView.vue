<template>
  <v-alert
    v-model="alert"
    border="top"
    variant="tonal"
    closable
    close-label="Close Alert"
    color="error"
    title="본인 인증에 실패하였습니다"
    @click:close="alertClose"
  >
    주민등록번호 뒷자리를 다시 한번 확인해주세요.
  </v-alert>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
    @alertTrue="alertTrue"
  >
    <BasicForm></BasicForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useBtnStore } from '@/store/btnStore.js';
import { useRouter } from 'vue-router';

import Card from '@/components/card/Card.vue';
import BasicForm from '@/components/Form/BasicForm.vue';

const btnStore = useBtnStore();
const { setisBasicInfo } = btnStore;

const props = defineProps(['nextUrl']);

const cardTitle = ref('기본 정보 입력');
const next = ref('본인 인증 하기');
const nextUrl = ref('2');

const alert = ref(false);
const router = useRouter();

const onClickNextBtnEmit = async () => {
  setisBasicInfo(false);
};

const alertTrue = (child) => {
  alert.value = child;
};

const alertClose = () => {
  alert.value = false;
  router.go(0);
};
</script>

<style lang="scss" scoped></style>
