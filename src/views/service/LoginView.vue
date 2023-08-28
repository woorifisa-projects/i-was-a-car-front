<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet width="500" height="690" class="mt-5 rounded-xl" :elevation="4">
      <v-card-title class="text-center text-h5 ma-8">로그인</v-card-title>
      <v-sheet width="350" class="mx-auto" max-width="320">
        <v-form @submit.prevent>
          <v-text-field
            density="compact"
            v-model="form.email"
            label="이메일"
            class="mb-2"
            variant="underlined"
            :rules="[rules.requiredEmail]"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            label="비밀번호"
            @click:append-inner="passwordVisible = !passwordVisible"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            variant="underlined"
          ></v-text-field>

          <p
            v-show="error.loginError"
            class="text-subtitle-2 text-center text-color-red"
          >
            {{ error.loginErrorMsg }}
          </p>

          <v-btn
            class="mt-10"
            height="40"
            width="400"
            color="black"
            density="compact"
            @click="login"
          >
            로그인
          </v-btn>
        </v-form>

        <div class="d-flex justify-space-between mt-2 mb-15">
          <div class="text-sm">회원이 아니신가요?</div>
          <RouterLink class="text-sm text-color-black" to="/signup"
            >회원가입</RouterLink
          >
        </div>
        <div class="d-flex justify-center">
          <v-divider
            mx-auto
            length="400"
            thickness="3"
            align-center
          ></v-divider>
        </div>

        <div class="d-flex justify-center mt-5 mb-5">
          <div class="text-sm">다른 방법으로 로그인</div>
        </div>

        <v-sheet>
          <v-btn
            prepend-icon="mdi-chat"
            height="40"
            width="400"
            color="yellow"
            density="compact"
            class="mb-5"
          >
            카카오로 시작하기
          </v-btn>

          <v-btn
            prepend-icon="mdi-alpha-n"
            height="40"
            width="400"
            color="green"
            density="compact"
          >
            <template v-slot:prepend>
              <v-icon size="32"></v-icon>
            </template>
            네이버로 시작하기
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const rules = {
  requiredEmail: (value) => !!value || '이메일을 입력해 주세요.',
  requiredPassword: (value) => !!value || '비밀번호를 입력해 주세요.',
};

const login = () => {
  axios
    .post('http://localhost:8080/api/v1/members/login', form.value, {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then((res) => {
      if (res.status === '200') {
        console.log(res.data.data);
        error.loginError.value = false;
        router.push({ name: 'Home' });
      }
    })
    .catch((e) => {
      if (e.response.status === 500 || e.response.status === 401) {
        error.value.loginError = true;
        error.value.loginErrorMsg = '이메일 또는 비밀번호를 잘못 입력했습니다.';
      }
    });
};
</script>

<style scoped>
.text-sm {
  font-size: 12px;
}

.text-color-black {
  color: black;
}

.text-color-red {
  color: tomato;
}
</style>
