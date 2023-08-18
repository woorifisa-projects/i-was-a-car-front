<template>
  <v-container class="d-flex justify-center h-screen">
    <v-sheet width="500" height="690" class="mt-5 rounded-xl" :elevation="4">
      <v-card-title class="text-center text-h5 ma-8">로그인</v-card-title>

      <v-sheet width="400" class="mx-auto" max-width="320">
        <v-form @submit.prevent>
          <v-text-field
            density="compact"
            v-model="firstName"
            label="이메일"
            class="mb-2"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            label="비밀번호"
            @click:append-inner="passwordVisible = !passwordVisible"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            variant="underlined"
          ></v-text-field>
          <v-btn height="56" width="400" color="black" density="compact">
            로그인
          </v-btn>
        </v-form>

        <div class="d-flex justify-space-between mt-2 mb-15">
          <div>회원이 아니신가요?</div>
          <div>
            <router-link to="/signup">회원가입</router-link>
          </div>
        </div>
        <div class="d-flex justify-center">
          <v-divider
            mx-auto
            length="400"
            thickness="3"
            align-center
          ></v-divider>
        </div>

        <div class="d-flex justify-center mt-5 mb-15">
          <div>다른 방법으로 로그인</div>
        </div>

        <v-sheet>
          <v-btn height="56" width="400" color="black" density="compact">
            카카오로그인
          </v-btn>

          <v-btn height="56" width="400" color="black" density="compact">
            네이버로그인
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const passwordVisible = ref(false);
</script>

<style lang="scss" scoped></style>
