<template>
  <v-app-bar flat density="comfortable" elevation="2">
    <v-app-bar-nav-icon
      class="d-sm-none"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-container class="d-flex justify-space-between align-center">
      <RouterLink to="/" class="nav-title font-weight-black text-sm-h5">
        I was a car
      </RouterLink>

      <template v-if="isLogin">
        <div class="d-none d-sm-block font-weight-medium">
          <RouterLink class="nav-item" to="/mypage">마이페이지</RouterLink>
          <span class="logout-btn" @click="logoutHandler">로그아웃</span>
        </div>
      </template>

      <template v-else>
        <div class="d-none d-sm-block font-weight-medium">
          <RouterLink class="nav-item" to="/email">가입하기</RouterLink>
          <RouterLink class="nav-item" to="/login">로그인하기</RouterLink>
        </div>
      </template>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="top"
    temporary
    elevation="0"
    style="max-height: 125px"
  >
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.value"
        :to="item.to"
        @click="logoutHandler($event, item)"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { logoutAPI } from '@/apis/service/auth/authApi';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const auth = useAuthStore();
const { setLogout, initAuthInfo } = auth;
const { isLogin } = storeToRefs(auth);

const drawer = ref(false);
const toggleDrawer = () => (drawer.value = !drawer.value);

const navItems = computed(() => {
  return isLogin.value ? loginNavItems.value : notLoginNavItems.value;
});

const logoutHandler = async (e, item) => {
  if (e.target.textContent === '로그아웃' || item.title === '로그아웃') {
    try {
      const data = await logoutAPI();
      if (data === 204) {
        console.log('[로그아웃 완료]');
        initAuthInfo();
        router.push({ name: 'Home' });
      }
      setLogout();
    } catch (e) {
      console.error('logoutHandler: ', e);
    }
  }
};

const notLoginNavItems = ref([
  {
    title: '가입하기',
    name: 'signup',
    to: '/signup',
  },
  {
    title: '로그인하기',
    name: 'login',
    to: '/login',
  },
]);

const loginNavItems = ref([
  {
    title: '마이페이지',
    name: 'mypage',
    to: '/mypage',
  },
  {
    title: '로그아웃',
    name: 'logout',
    to: '/',
  },
]);
</script>

<style scoped>
.nav-title {
  text-decoration: none;
  color: black;
}

.nav-item {
  color: black;
  text-decoration: none;
  margin-right: 15px;
}

.logout-btn {
  margin-right: 15px;
  cursor: pointer;
}
</style>
