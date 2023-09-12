<template>
  <v-card-actions class="d-flex justify-space-around position">
    <v-btn
      class="text-none ma-0"
      :elevation="2"
      width="120"
      height="40"
      @click="toPrev"
    >
      {{ prev }}</v-btn
    >
    <v-btn
      class="text-none bg-black ma-0"
      :elevation="2"
      width="120"
      height="40"
      @click="onClickNextBtn(), $emit('onClickNextBtnEmit')"
      :disabled="computedBtnCondition"
    >
      {{ next }}
    </v-btn>
  </v-card-actions>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useBtnStore } from '@/store/btnStore';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { getIdentification } from '@/apis/service/contracts/contractApi';
import { useContractStore } from '@/store/contractStore';

const contractStore = useContractStore();
const { setRadioReadOnly } = contractStore;

const btnStore = useBtnStore();
const { isBasicInfo, computedBtnCondition } = storeToRefs(btnStore);
const { setisBasicInfo } = btnStore;

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);
const { setRrnb } = authStore;

const emit = defineEmits(['onClickNextBtnEmit', 'alertTrue']);
const router = useRouter();
const props = defineProps(['prev', 'prevUrl', 'next', 'nextUrl']);

const nextUrl = props.nextUrl;
const next = ref(isBasicInfo.value ? '본인 인증 하기' : props.next);
const prevUrl = ref(props.prevUrl == null ? -1 : props.prevUrl);
const prev = ref(props.prev == null ? '이전' : props.prev);

const onClickNextBtn = async () => {
  if (next.value === '본인 인증 하기') {
    // api 보내기
    try {
      const response = await getIdentification(
        authInfo.value.name,
        authInfo.value.birth,
        authInfo.value.rrnb
      );

      setisBasicInfo(false);
      next.value = '다음';
      setRadioReadOnly(true);
    } catch (e) {
      console.error(e);

      //실패면
      setRrnb('');
      emit('alertTrue', true);
    }

    return;
  }
  router.push(nextUrl);
};

const toPrev = () => {
  if (prevUrl.value == -1) {
    router.go(prevUrl.value);
  } else {
    router.push(prevUrl.value);
  }
};
</script>

<style lang="scss" scoped>
.position {
  position: absolute;
  bottom: 1.5em;
  left: 50%;
  transform: translate(-50%);
  width: 350px;
}
</style>
