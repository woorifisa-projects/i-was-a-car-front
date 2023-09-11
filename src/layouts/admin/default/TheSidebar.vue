<template>
  <v-card>
    <v-navigation-drawer class="bg-black" permanent elevation="2">
      <template v-slot:prepend>
        <v-list-item lines="two">
          <h1 class="text-h6 font-weight-bold">I WAS A CAR</h1>
          <div class="d-flex justify-space-between align-center">
            <v-chip
              class="my-2 font-weight-bold"
              color="success"
              variant="outlined"
              size="small"
            >
              <v-icon start icon="mdi-account-circle"></v-icon>
              관리자
            </v-chip>
            <span class="font-weight-bold"
              >{{ authInfo.name ? authInfo.name + '님' : '관리자님' }}
            </span>
          </div>
        </v-list-item>
      </template>

      <v-divider :thickness="1" style="color: white; opacity: 0.5"></v-divider>

      <v-list density="compact" nav>
        <v-list-group value="상품관리">
          <template v-slot:activator="{ props }">
            <v-list-item
              rounded="shaped"
              v-bind="props"
              prepend-icon="mdi-car-multiple"
              title="상품 관리"
              value="productManagement"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, to], i) in products"
            :key="i"
            :title="title"
            :value="title"
            :to="to"
            active-class="nav-active"
            exact
            rounded="shaped"
          ></v-list-item>
        </v-list-group>

        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="사용자 관리"
          value="memberManagement"
          to="/admin/member"
          active-class="nav-active"
          rounded="shaped"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-math-log"
          title="로그 관리"
          value="logManagement"
          to="/admin/log"
          active-class="nav-active"
          rounded="shaped"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="white" rounded="xl">LOGOUT</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const auth = useAuthStore();
const { authInfo } = storeToRefs(auth);
console.log(authInfo);
const products = ref([
  ['전체 상품 조회', '/admin'],
  ['심사 대기 차량 조회', '/admin/judge'],
]);
</script>

<style scoped>
.nav-active {
  /* background-color: red; */
}
</style>
