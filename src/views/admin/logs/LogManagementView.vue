<template>
  <div class="center-container">
    <v-sheet>
      <h2>로그 관리</h2>
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
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { logHistoryAPI } from '@/apis/admin/logss/logAPI';

const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'start',
    key: 'id',
    sortable: false,
    title: '로그번호',
  },
  { title: '이메일', key: 'email' },
  { title: '상태', key: 'log' },
  { title: '발생 시간', key: 'createdAt' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await logHistoryAPI(page.value, itemsPerPage);

    orderData.value = res.data.data.items;
    pageCount.value = res.data.data.totalPage;
    console.log(orderData.value);
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

<style lang="scss" scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport Height */
}
</style>
