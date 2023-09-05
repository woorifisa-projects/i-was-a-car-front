<template>
  <v-app>
    <default-bar />

    <v-tabs
      v-model="tab"
      class="mt-15"
      color="deep-black-accent-4"
      align-tabs="center"
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :value="item"
        style="font-size: 20px"
        :is="selectedComponent"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-container>
      <router-view @historyNo="goDetail" @historyList="goList" />
    </v-container>
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue';
import DefaultView from './View.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tab = ref('구매이력');
const items = ['구매이력', '판매이력', '회원정보'];
const flag = ref('TRUE');
const paramsId = ref();

const path = ref('/purchase');
const selectedComponent = computed(() => {
  if (flag.value === 'TRUE') {
    if (tab.value === '구매이력') {
      router.push('/purchase');
    } else if (tab.value === '판매이력') {
      router.push('/sale');
    } else {
      router.push('/member');
    }
  } else {
    if (tab.value === '구매이력') {
      router.push({
        name: 'PurchaseHistoryDetail',
        params: { id: paramsId.value },
      });
    } else if (tab.value === '판매이력') {
      router.push({
        name: 'SaleHistoryDetail',
        params: { id: paramsId.value },
      });
    }
  }
});

const goDetail = (child) => {
  flag.value = 'FALSE';
  paramsId.value = child;
};

const goList = () => {
  flag.value = 'TRUE';
};
</script>
