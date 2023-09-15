<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet
      width="500"
      height="690"
      class="mt-2 rounded-xl"
      :elevation="xs ? 0 : 4"
    >
      <v-card-title class="text-center text-h4 font-weight-black ma-12 mb-16"
        >I WAS A CAR</v-card-title
      >
      <v-sheet width="320" class="mt-16 mx-auto" max-width="320" height="320">
        <v-form @submit.prevent class="d-flex flex-column">
          <v-text-field
            density="compact"
            v-model="form.email"
            label="이메일"
            class="mb-2"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            class="mt-5"
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            label="비밀번호"
            @click:append-inner="passwordVisible = !passwordVisible"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            variant="underlined"
            @keyup.enter="loginHandler"
          ></v-text-field>

          <p v-if="error.loginError" class="text-subtitle-2" style="color: red">
            {{ error.loginErrorMsg }}
          </p>
          <p v-else class="text-subtitle-2">ㅤ</p>

          <v-btn
            size="x-large"
            class="mt-10 w-100 font-weight-medium"
            color="black"
            density="comfortable"
            @click="loginHandler"
          >
            로그인
          </v-btn>
        </v-form>

        <div class="d-flex justify-space-between mt-5">
          <div class="text-sm">회원이 아니신가요?</div>
          <RouterLink class="text-sm text-color-black" to="/signup"
            >회원가입</RouterLink
          >
        </div>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginAPI } from '@/apis/service/auth/authApi';
import { useAuthStore } from '@/store/auth';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const router = useRouter();

const passwordVisible = ref(false);

const form = ref({
  email: '',
  password: '',
});

const error = ref({
  loginError: false,
  loginErrorMsg: '',
});

const auth = useAuthStore();

const { verifiedAuth } = auth;

const loginHandler = async () => {
  try {
    if (!form.value.email && !form.value.password) {
      error.value.loginError = true;

      error.value.loginErrorMsg = '이메일과 비밀번호를 입력해주세요.';

      return;
    }

    const { data } = await loginAPI(form.value);

    verifiedAuth(data);

    if (data.roles.find((el) => el === 'ADMIN')) {
      router.push('/admin');
    } else {
      router.push({ name: 'Home' });
    }
  } catch (e) {
    if (e.response.status === 401 || e.response.status === 400) {
      error.value.loginError = true;

      error.value.loginErrorMsg = '이메일 또는 비밀번호를 잘못 입력했습니다.';
    }
  }
};
</script>

<style scoped>
.text-sm {
  font-size: 15px;
}

.text-color-black {
  color: black;
}
</style>
