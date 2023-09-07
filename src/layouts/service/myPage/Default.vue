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
        @click="changeFlag"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-container>
      <router-view
        @historyNo="goDetail"
        @historyList="goList"
        :clickMember="clickMember"
      />
    </v-container>
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { memberDetailApi } from '@/apis/service/histories/memberInfoApi.js';

const clickMember = ref(true);

const router = useRouter();

const tab = ref('구매이력');
const items = ['구매이력', '판매이력', '회원정보'];
const flag = ref('TRUE');
const paramsId = ref();

const path = ref('/purchase');
const selectedComponent = computed(() => {
  if (flag.value === 'TRUE') {
    if (tab.value === '구매이력') {
      path.value = '/purchase';
      router.push(path.value);
    } else if (tab.value === '판매이력') {
      path.value = '/sale';
      router.push(path.value);
    } else {
      path.value = '/member';
      router.push(path.value);
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

const changeFlag = () => {
  flag.value = 'TRUE';
  if (tab.value === '회원정보') {
    clickMember.value = !clickMember.value;
  }
};
</script>
