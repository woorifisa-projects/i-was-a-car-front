<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-sheet
      class="mt-5 rounded-xl"
      :elevation="4"
      width="500"
      height="690"
      max-height="690"
    >
      <v-card-title class="text-center text-h5 ma-8">이메일 인증</v-card-title>
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
                  @click="load"
                  variant="text"
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
              label="인증번호 입력"
              density="compact"
              clearable
              variant="underlined"
              class="mt-10"
            ></v-text-field>
            <v-sheet class="d-flex justify-end">
              <v-btn @click="verifyAuthentication" variant="text"
                >인증하기</v-btn
              >
            </v-sheet>
          </template>
        </v-form>

        <v-sheet class="d-flex justify-space-between mt-5">
          <v-btn width="120" height="40" to="/">이전</v-btn>
          <v-btn
            :disabled="isVerifyAuthentication"
            width="120"
            height="40"
            class="bg-black"
            to="signup"
            @click="setEmailHandler"
            >다음</v-btn
          >
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const isValidEmail = ref(false);
const disabled = ref(true);
const isVerifyAuthentication = ref(true);

const auth = useAuthStore();
const { setEmail } = auth;

const setEmailHandler = () => {
  setEmail(email.value);
};

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

const load = () => {
  loading.value = true;
  isValidEmail.value = true;
  setTimeout(() => (loading.value = false), 1000);
};

const verifyAuthentication = () => {
  isVerifyAuthentication.value = false;
};
</script>

<style scoped></style>
