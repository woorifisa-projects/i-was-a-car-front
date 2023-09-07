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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    주민등록번호 뒷자리를 다시 한번 확인해주세요.
=======
    Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Cras
    dapibus. Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices
    tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed
    mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing
    dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien,
    tincidunt non, euismod vitae, posuere imperdiet, leo.
>>>>>>> c0422d5 (feat:구매 로직 연결[#3])
=======
    주민등록번호가 올바른지 다시 한번 체크 하여주시길 바랍니다.
>>>>>>> 23616d6 (원클릭 연결 완료[#3])
=======
    주민등록번호 뒷자리를 다시 한번 확인해주세요.
>>>>>>> 5860fef (feat:구매 로직 연결[#3])
  </v-alert>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
    @alertTrue="alertTrue"
  >
    <BasicForm @isReady="isReadyCheck"></BasicForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useBtnStore } from '@/store/btnStore';
import { useRouter } from 'vue-router';

const btnStore = useBtnStore();
const { setisBasicInfo } = btnStore;

import Card from '@/components/card/Card.vue';
import BasicForm from '@/components/Form/BasicForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('기본 정보 입력');
const next = ref('본인 인증 하기');
const nextUrl = ref(props.nextUrl);

const alert = ref(false);
const router = useRouter();

const onClickNextBtnEmit = () => {
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
