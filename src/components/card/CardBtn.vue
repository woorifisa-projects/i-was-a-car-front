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
      :class="isBasicInfo ? 'text-none ma-0' : 'text-none bg-black ma-0'"
      :elevation="2"
      :variant="isBasicInfo ? 'outlined' : 'none'"
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
import { ref, defineEmits, defineProps, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useBtnStore } from '@/store/btnStore.js';
import { useAuthStore } from '@/store/auth.js';
import { storeToRefs } from 'pinia';
import { getIdentification } from '@/apis/service/contracts/contractApi.js';
import { useContractStore } from '@/store/contractStore.js';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';
import { useLoadingStore } from '@/store/loading.js';

const loading = useLoadingStore();
const { setLoading } = loading;

onBeforeMount(() => {
  setRadioReadOnly(false);
});

const contractStore = useContractStore();
const { setRadioReadOnly } = contractStore;

const btnStore = useBtnStore();
const { isBasicInfo, computedBtnCondition } = storeToRefs(btnStore);
const { setisBasicInfo, setBtnCondition } = btnStore;

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);
const { setRrnb } = authStore;

const saleStore = useSaleStore();
const { request, saleResponse } = storeToRefs(saleStore);

const purchasestore = usePurchaseStore();
const { purchaseResponse } = storeToRefs(purchasestore);

const emit = defineEmits(['onClickNextBtnEmit', 'alertTrue']);
const router = useRouter();
const props = defineProps(['prev', 'prevUrl', 'next', 'nextUrl', 'type']);

const type = ref(props.type);
const nextUrl = ref(props.nextUrl);
const next = ref(isBasicInfo.value ? '본인 인증 하기' : props.next);
const prevUrl = ref(props.prevUrl == null ? -1 : props.prevUrl);
const prev = ref(props.prev == null ? '이전' : props.prev);

const onClickNextBtn = async () => {
  setBtnCondition(false);
  if (next.value === '본인 인증 하기') {
    // api 보내기
    try {
      const response = await getIdentification(
        authInfo.value.name,
        authInfo.value.birth,
        authInfo.value.rrnb
      );

      setisBasicInfo(false);
      setLoading(true);

      next.value = '다음';
      setRadioReadOnly(true);
      setLoading(false);
    } catch (e) {
      console.error(e);

      //실패면
      setRrnb('');
      emit('alertTrue', true);
    }
    setBtnCondition(true);
    return;
  }

  if (next.value === '마이페이지로' && type.value === 'sale') {
    // console.log(saleResponse.value);
    // nextUrl.value = `mypage/sale/${saleResponse.value.saleId}`;
    // router.push(nextUrl.value);
    router.push({
      name: 'SaleHistoryDetail',
      params: {
        id: saleResponse.value.saleId,
      },
    });
    return;
  }

  if (next.value === '마이페이지로' && type.value === 'purchase') {
    // console.log(purchaseResponse.value);
    // nextUrl.value = `mypage/purchase/${purchaseResponse.value.id}`;

    router.push({
      name: 'PurchaseHistoryDetail',
      params: {
        id: purchaseResponse.value.id,
      },
    });
    return;
  }

  router.push(nextUrl.value);
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
