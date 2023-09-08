import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useValidateSaleStore = defineStore('validateSaleStore', () => {
  // MeetingLocation.vue
  const meetingCheck = ref(false);
  const setMeetingCheck = (bool) => (meetingCheck.value = bool);

  // CarRetrieve.vue
  const carInfoCheck = ref(false);
  const setCarInfoCheck = (bool) => (carInfoCheck.value = bool);

  // ImageAttach.vue
  const imagesCheck = ref(false);
  const setImageInfoCheck = (bool) => (imagesCheck.value = bool);

  // PriceAndAccount.vue
  const financeCheck = ref(false);
  const setFinanceInfoCheck = (bool) => (financeCheck.value = bool);

  const allValid = ref(
    meetingCheck.value && carInfoCheck.value && imagesCheck.value && financeCheck.value
  );

  return {
    // MeetingLocation.vue
    setMeetingCheck,

    // CarRetrieve.vue
    setCarInfoCheck,

    // ImageAttach.vue
    setImageInfoCheck,

    // PriceAndAccount.vue
    setFinanceInfoCheck,
  };
});
