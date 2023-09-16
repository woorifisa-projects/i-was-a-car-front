<template>
  <v-app>
    <default-bar />

    <v-tabs
      v-model="tab"
      color="deep-black-accent-4"
      align-tabs="center"
      style="margin-top: 80px"
    >
      <v-tab
        class="font-weight-bold"
        :width="xs ? 100 : 200"
        v-for="item in items"
        :key="item"
        :value="item"
        :class="xs ? 'fs-15' : 'fs-20'"
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
import DefaultBar from '@/layouts/common/AppBar.vue';
import { useLoadingStore } from '@/store/loading';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const clickMember = ref(true);

const router = useRouter();

const tab = ref('구매이력');
const items = ['구매이력', '판매이력', '회원정보'];
const flag = ref('TRUE');
const paramsId = ref();

const path = ref('MyPagePurchase');
const selectedComponent = computed(() => {
  if (flag.value === 'TRUE') {
    if (tab.value === '구매이력') {
      path.value = 'MyPagePurchase';
    } else if (tab.value === '판매이력') {
      path.value = 'MyPageSale';
    } else {
      path.value = 'MyPageMember';
    }

    router.push({ name: path.value, replace: true });
  } else {
    if (tab.value === '구매이력') {
      router.push({
        name: 'PurchaseHistoryDetail',
        params: { id: paramsId.value },
        replace: true,
      });
    } else if (tab.value === '판매이력') {
      router.push({
        name: 'SaleHistoryDetail',
        params: { id: paramsId.value },
        replace: true,
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

<style scoped>
.fs-20 {
  font-size: 20px;
}

.fs-15 {
  font-size: 15px;
}
</style>
