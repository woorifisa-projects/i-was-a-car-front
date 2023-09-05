<template>
  <v-data-table
    height="500"
    v-if="orderData.length"
    :page.sync="page"
    :headers="headers"
    :items="orderData"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="mt-6"
  >
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          @click="changePage(page)"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { saleHistoryAPI } from '@/apis/service/histories/historyApi.js';

const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'start',
    key: 'productName',
    sortable: false,
    title: '상품정보',
  },
  { title: '등록일자', key: 'createdAt' },
  { title: '상품번호', key: 'saleHistoryNo' },
  { title: '등록상태', key: 'label' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const res = await saleHistoryAPI(memberId, page.value, itemsPerPage);

    orderData.value = res.data.data.items;
    pageCount.value = res.data.data.totalPage;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onBeforeMount(() => {
  fetchData();
});

const changePage = (newPage) => {
  page.value = newPage;
  fetchData();
};
</script>

<style lang="scss" scoped></style>
