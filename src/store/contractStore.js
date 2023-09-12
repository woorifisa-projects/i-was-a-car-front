import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContractStore = defineStore('contractStore', () => {
  const request = ref([]);
  const documentItems = ref([]); 
  const isConsent = ref(false);
  const productId = ref();
  const response = ref();
  const radioReadOnly = ref(false);
  const marketingDocumnetItems = ref([]);
  const isConsentMarketing = ref(false);

  const setContract = (d) => {
    documentItems.value.push(...d);
  };

  const setMarketingContract = (d) => {
    marketingDocumnetItems.value.push(...d);
  };

  const setIsConsent = (v) => {
    isConsent.value = v;
  }

  const setIsConsentMarketing = (v) => {
    isConsent.value = v;
  }

  const setConsent = (di, c, m) => {
    const obj = {};

    obj.documentItemId = di;
    obj.consent = c;
    obj.memberId = m;  

    if (!!productId.value) {
      obj.productId = productId.value
    }

    request.value.push(obj);
  }

  const setProductId = (p) => {
    productId.value = p;
  }

  const setRadioReadOnly = (v) => {
    radioReadOnly.value = v;
  }
  const resetRequest = () => {
    request.value = [];
  }
  const setResponse = (v) => {
    setResponse.value = v;
  }

  return {
    request,
    documentItems,
    isConsent,
    productId,
    radioReadOnly,
    response,
    marketingDocumnetItems,
    isConsentMarketing,
    setContract,
    setIsConsent,
    setConsent,
    setProductId,
    setRadioReadOnly,
    resetRequest,
    setResponse,
    setIsConsentMarketing,
    setMarketingContract
  };
});
