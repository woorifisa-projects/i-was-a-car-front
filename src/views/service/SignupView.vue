<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      class="mt-2 rounded-xl"
      :elevation="xs ? 0 : 4"
      width="500"
      height="700"
    >
      <v-card-title class="text-center text-h5 font-weight-black mt-8 mb-5"
        >회원가입</v-card-title
      >
      <v-sheet class="mx-auto" max-width="320">
        <v-form @submit.prevent>
          <v-text-field
            type="email"
            readonly
            density="compact"
            variant="underlined"
          >
            {{ form.email ? form.email : router.push('/email') }}
          </v-text-field>

          <v-text-field
            class="mb-3"
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            label="비밀번호"
            @click:append-inner="passwordVisible = !passwordVisible"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            variant="underlined"
            v-model="form.password"
            required
            :rules="[rules.required, rules.password]"
          ></v-text-field>

          <v-text-field
            v-model="passwordCheck"
            type="password"
            label="비밀번호 확인"
            density="compact"
            variant="underlined"
          >
            <template #append-inner>
              <v-icon
                v-if="passwordCheck && isValidPasswordCheck"
                color="success"
              >
                mdi-check-circle
              </v-icon>

              <v-icon
                v-else-if="passwordCheck && !isValidPasswordCheck"
                color="error"
                >mdi-close-circle
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            class="mb-3"
            label="이름"
            density="compact"
            variant="underlined"
            v-model="form.name"
            :rules="[rules.required, rules.name]"
          ></v-text-field>

          <v-text-field
            class="mb-3"
            label="휴대폰 번호"
            density="compact"
            placeholder="01012345678"
            variant="underlined"
            v-model="form.tel"
            :rules="[rules.required, rules.tel]"
          ></v-text-field>

          <v-text-field
            label="생년월일"
            density="compact"
            variant="underlined"
            v-model="form.birth"
            :rules="[rules.required, rules.birth]"
            suffix="YYYY-MM-DD"
          ></v-text-field>

          <v-sheet class="d-flex justify-space-between">
            <v-radio-group
              label="성별"
              v-model="form.gender"
              class="w-50"
              style="margin-left: -8px"
              inline
              @update:model-value="validations.gender = !!form.gender"
            >
              <v-radio label="남" value="남자"></v-radio>
              <v-radio label="여" value="여자"></v-radio>
            </v-radio-group>

            <v-radio-group
              class="w-50"
              label="면허 유무"
              v-model="form.hasLicense"
              inline
              @update:model-value="validations.hasLicense = !!form.hasLicense"
            >
              <v-radio label="있음" value="true"></v-radio>
              <v-radio label="없음" value="false"></v-radio>
            </v-radio-group>
          </v-sheet>

          <v-sheet class="d-flex justify-space-between mt-2">
            <v-btn width="120" height="40" to="/signup-consent">이전</v-btn>
            <v-btn
              :disabled="!allValid"
              width="120"
              height="40"
              class="bg-black"
              @click="signupHandler"
              >완료</v-btn
            >
          </v-sheet>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { signupAPI } from '@/apis/service/auth/authApi';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useContractStore } from '@/store/contractStore';
import { createConsent } from '@/apis/service/contracts/contractApi';

const contractStore = useContractStore();
const { setConsent, setResponse, resetRequest } = contractStore;
const {
  request,
  documentItems,
  marketingDocumnetItems,
  isConsent,
  isConsentMarketing,
} = storeToRefs(contractStore);

const { xs } = useDisplay();

const router = useRouter();

const auth = useAuthStore();
const { emailAuthInfo } = storeToRefs(auth);
const { verifiedAuth } = auth;

const form = ref({
  email: emailAuthInfo.value.email,
  code: emailAuthInfo.value.code,
  password: '',
  name: '',
  tel: '',
  birth: '',
  gender: '',
  hasLicense: '',
});

const validations = ref({
  // email: false,
  password: false,
  name: false,
  tel: false,
  birth: false,
  gender: false,
  hasLicense: false,
});

const passwordCheck = ref('');

const passwordVisible = ref(false);

const isValidPasswordCheck = ref(true);

const allValid = computed(() => {
  return (
    isValidPasswordCheck.value &&
    Object.values(validations.value).every((v) => v)
  );
});

watch(passwordCheck, () => {
  if (passwordCheck.value === form.value.password) {
    isValidPasswordCheck.value = true;
  } else {
    isValidPasswordCheck.value = false;
  }
});

const rules = {
  required: (value) => !!value || '필수 값입니다.',

  password: (value) => {
    const pattern =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    validations.value.password = pattern.test(value) ? true : false;

    return (
      pattern.test(value) ||
      '영문 소문자와 숫자, 특수기호가 1개 이상씩 포함된 8자 ~ 20자'
    );
  },

  name: (value) => {
    const pattern = /^[가-힣]{2,10}$/;

    validations.value.name = pattern.test(value) ? true : false;

    return pattern.test(value) || '이름은 최소 두 글자 이상 입력해주세요.';
  },

  tel: (value) => {
    const pattern = /^01[0-9]\d{4}\d{4}$/;

    validations.value.tel = pattern.test(value) ? true : false;

    return pattern.test(value) || '올바른 전화번호 형식을 입력해주세요.';
  },

  birth: (value) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;

    validations.value.birth = pattern.test(value) ? true : false;

    return pattern.test(value) || '올바른 날짜 형식을 입력해주세요.';
  },
};

const signupHandler = async () => {
  try {
    const { data } = await signupAPI(form.value);

    verifiedAuth(data);

    try {
      //문서 동의 항목 저장
      documentItems.value.forEach((e) => {
        setConsent(e.documentItemId, isConsent.value, data.id);
      });

      marketingDocumnetItems.value.forEach((e) => {
        setConsent(e.documentItemId, isConsentMarketing.value, data.id);
      });

      await createConsent()
        .then((resp) => {
          const response = resp.data.data;
          setResponse(response);
        })
        .catch((e) => console.error(e));

      resetRequest();

      router.push({ name: 'Home' });
    } catch (e) {
      console.log('문서 저장 오류: ', e);
    }
  } catch (e) {
    if (e.response.status === 401) {
      console.error('signupHandler: ', e);
    }
  }
};
</script>

<style scoped></style>
