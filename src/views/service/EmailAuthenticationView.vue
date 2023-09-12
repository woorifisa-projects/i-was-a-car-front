<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-sheet
      class="mt-2 rounded-xl"
      :elevation="xs ? 0 : 4"
      width="500"
      height="690"
      max-height="690"
    >
      <v-card-title class="text-center text-h5 font-weight-black ma-8"
        >이메일 인증</v-card-title
      >
      <v-sheet
        width="350"
        class="mx-auto d-flex flex-column justify-space-between"
        max-width="320"
        height="540"
      >
        <v-form
          @submit.prevent
          class="d-flex flex-column justify-space-between"
        >
          <v-text-field
            v-model="email"
            type="email"
            label="이메일"
            density="compact"
            variant="underlined"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-snackbar :timeout="2000" color="deep-black" class="elevation-24">
            <template v-slot:activator="{ props }">
              <v-sheet class="d-flex justify-end">
                <v-btn
                  :loading="loading"
                  @click="sendEmailCode"
                  variant="outlined"
                  :disabled="disabled"
                  v-bind="props"
                  >인증번호 발송</v-btn
                >
              </v-sheet>
            </template>

            <strong>인증번호가 전송되었습니다!</strong>
          </v-snackbar>

          <template v-if="isValidEmail">
            <v-text-field
              v-model="code"
              label="인증번호 입력"
              density="compact"
              clearable
              variant="underlined"
              class="mt-10"
            ></v-text-field>

            <v-sheet class="d-flex justify-space-between align-center">
              <span
                v-if="errorMsg === 'fail'"
                class="text-red text-subtitle-2 font-weight-bold"
                >{{ failMsg }}</span
              >
              <span
                v-else-if="errorMsg === 'success'"
                class="text-green text-subtitle-2 font-weight-bold"
                >{{ successMsg }}</span
              >
              <span v-else></span>
              <v-btn @click="verifyEmailCode" variant="outlined" width="120"
                >인증하기</v-btn
              >
            </v-sheet>
          </template>
        </v-form>

        <v-sheet class="d-flex justify-space-between mt-5">
          <v-btn width="120" height="40" to="/">이전</v-btn>
          <v-btn
            :disabled="isVerifyEmailCode"
            width="120"
            height="40"
            class="bg-black"
            to="/signup-consent"
            >다음</v-btn
          >
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import {
  sendEmailCodeAPI,
  verifyEmailCodeAPI,
} from '@/apis/service/auth/authApi';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const email = ref('');
const code = ref('');
const loading = ref(false);
const isValidEmail = ref(false);
const disabled = ref(true);
const isVerifyEmailCode = ref(true);
const errorMsg = ref('');

const successMsg = '인증이 완료되었습니다.';
const failMsg = '인증번호가 올바르지 않습니다.';

const auth = useAuthStore();
const { emailAuthInfo } = storeToRefs(auth);
const { setEmailAuthInfo } = auth;

const rules = {
  required: (value) => !!value || '이메일을 반드시 입력해 주세요.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (pattern.test(value)) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }

    return pattern.test(value) || '올바르지 않은 이메일 형식입니다.';
  },
};

const sendEmailCode = async () => {
  try {
    loading.value = true;

    isValidEmail.value = true;

    const body = {
      email: email.value,
    };

    const { data } = await sendEmailCodeAPI(body);

    // 나중에 지워야 함
    console.log('테스트를 위한 인증번호 로그: ', data.code);
    //

    setEmailAuthInfo(data.code, email.value);

    setTimeout(() => (loading.value = false), 1000);
  } catch (e) {
    console.error('sendEmailCode: ', e);
  }
};

const verifyEmailCode = async () => {
  try {
    if (emailAuthInfo.value.code !== code.value) {
      errorMsg.value = 'fail';
      return;
    }

    const data = await verifyEmailCodeAPI(emailAuthInfo.value);

    if (data.code === 200) {
      errorMsg.value = 'success';
      isVerifyEmailCode.value = false;
    }
  } catch (e) {
    console.error('verifyEmailCode: ', e);
  }
};
</script>

<style scoped></style>
