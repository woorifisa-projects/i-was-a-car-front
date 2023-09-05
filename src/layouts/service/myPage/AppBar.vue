<template>
  <v-app-bar flat density="comfortable" elevation="1">
    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-title> I was a car </v-app-bar-title>
      <div>
        <!-- <img class="logo" src="@/assets/images/header-logo.png" alt="logo" /> -->
      </div>
      <RouterLink class="nav-item" to="/email">가입하기</RouterLink>
      <RouterLink class="nav-item" to="/login">로그인하기</RouterLink>
    </v-container>
  </v-app-bar>
</template>

<script setup>
//
</script>

<style scoped>
.nav-item {
  color: black;
  text-decoration: none;
  margin-right: 15px;
}
</style>
