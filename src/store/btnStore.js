import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBtnStore = defineStore('btnStore', () => {
  const btnEnable = ref(true);
  const setBtnCondition = (value) => (btnEnable.value = value);
  const computedBtnCondition = computed(() => !btnEnable.value);
  
  const isBasicInfo = ref(false);
  const setisBasicInfo = (value) => {
    isBasicInfo.value = value;
  }
  return {
    btnEnable,
    setBtnCondition,
    computedBtnCondition,
    isBasicInfo,
    setisBasicInfo
  };
});
