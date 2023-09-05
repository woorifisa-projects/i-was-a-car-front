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
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-container>
      <component :is="selectedComponent"></component>
    </v-container>
    <!-- <default-view /> -->
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue';
import DefaultView from './View.vue';
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import PurchaseHistoryView from '@/views/service/mypage/PurchaseHistoryView.vue';
import SaleHistoryView from '@/views/service/mypage/SaleHistoryView.vue';
import MemberInfoView from '@/views/service/mypage/MemberInfoView.vue';

const tab = ref('구매이력');
const items = ['구매이력', '판매이력', '회원정보'];
const selectedComponent = computed(() => {
  if (tab.value === '구매이력') {
    return PurchaseHistoryView;
  } else if (tab.value === '판매이력') {
    return SaleHistoryView;
  } else {
    console.log(tab.value);
    return MemberInfoView;
  }
});
</script>
