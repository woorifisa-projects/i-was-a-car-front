<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet class="mt-5 rounded-xl" :elevation="4" width="500" height="690">
      <v-card-title class="text-center text-h5 ma-8">회원가입</v-card-title>
      <v-sheet class="mx-auto" max-width="320">
        <v-form @submit.prevent>
          <v-text-field
            type="email"
            readonly
            density="compact"
            variant="underlined"
          >
            {{ email ? email : router.push('/email') }}
          </v-text-field>

          <v-text-field
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            label="비밀번호"
            @click:append-inner="passwordVisible = !passwordVisible"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            variant="underlined"
            v-model="form.password"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            label="비밀번호 확인"
            density="compact"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            label="이름"
            density="compact"
            clearable
            variant="underlined"
            v-model="form.name"
          ></v-text-field>

          <v-text-field
            label="휴대폰 번호"
            density="compact"
            clearable
            placeholder="010-1234-5678"
            variant="underlined"
            v-model="form.tel"
          ></v-text-field>

          <v-text-field
            label="생년월일"
            placeholder="YYYY-MM-DD"
            density="compact"
            clearable
            variant="underlined"
            v-model="form.birth"
          ></v-text-field>

          <v-sheet class="d-flex justify-space-between">
            <v-radio-group
              label="성별"
              v-model="form.gender"
              class="w-50"
              inline
            >
              <v-radio label="남" value="남자"></v-radio>
              <v-radio label="여" value="여자"></v-radio>
            </v-radio-group>

            <v-radio-group
              class="w-50"
              label="면허 유무"
              v-model="form.hasLicense"
              inline
            >
              <v-radio label="있음" value="true"></v-radio>
              <v-radio label="없음" value="false"></v-radio>
            </v-radio-group>
          </v-sheet>

          <v-sheet class="d-flex justify-space-between mt-5">
            <v-btn width="120" height="40">이전</v-btn>
            <v-btn
              width="120"
              height="40"
              class="bg-black"
              @click="signupHandler"
              >다음</v-btn
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const auth = useAuthStore();
const { email } = storeToRefs(auth);
const { setAuthInfo, login } = auth;

const form = ref({
  email: email.value,
  password: '',
  name: '',
  birth: '',
  tel: '',
  gender: '',
  hasLicense: false,
});

const passwordVisible = ref(false);

const signupHandler = async () => {
  try {
    const { data } = await signupAPI(form.value);
    setAuthInfo(data);
    login();
    router.push({ name: 'Home' });
  } catch (e) {
    if (e.response.status === 401) {
      console.error('회원가입 실패: ', e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
