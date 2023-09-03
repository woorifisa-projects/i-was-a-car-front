<template>
  <v-card>
    <v-navigation-drawer theme="dark" permanent>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          title="관리자 황철원님"
          prepend-avatar="@/assets/admin-logo.png"
          nav
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-group value="상품관리">
          <template v-slot:activator="{ props }">
            <v-list-item
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
          ></v-list-item>
        </v-list-group>

        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="사용자 관리"
          value="memberManagement"
          to="member"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-math-log"
          title="로그 관리"
          value="logManagement"
          to="log"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="orange">LOGOUT</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  ['전체 상품 조회', ''],
  ['심사 대기 차량 조회', 'judge'],
]);
</script>

<style scoped></style>
