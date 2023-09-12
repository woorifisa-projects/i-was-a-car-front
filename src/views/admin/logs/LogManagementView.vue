<template>
  <div class="center-container">
    <v-sheet>
      <v-chip color="black" label size="large" class="px-10">
        <h3 class="font-weight-bold">로그 관리</h3>
      </v-chip>

      <v-data-table
        style="width: 1000px"
        height="550"
        v-if="orderData.length"
        :page.sync="page"
        :headers="headers"
        :items="orderData"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="mt-10 mx-auto text-center"
      >
        <template v-slot:item.log="{ item }">
          <v-chip :color="getColor(item.columns.log)" variant="outlined">
            {{ item.columns.log }}
          </v-chip>
        </template>
        <template v-slot:bottom>
          <div class="text-center">
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
    align: 'center',
    key: 'id',
    sortable: false,
    title: '로그번호',
  },
  { align: 'center', title: '이메일', key: 'email', sortable: false },
  { align: 'center', title: '상태', key: 'log', sortable: false },
  { align: 'center', title: '발생 시간', key: 'createdAt', sortable: false },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await logHistoryAPI(page.value, itemsPerPage);

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

const getColor = (label) => {
  if (label === '로그인' || label === '탁송완료' || label === '판매완료')
    return 'success';
  else if (label === '로그아웃') {
    return 'orange';
  } else if (label === '심사중' || label === '심사대기중' || label === '탁송중')
    return 'blue';
  else return 'error';
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
