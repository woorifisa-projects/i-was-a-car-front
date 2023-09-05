<template>
  <v-data-table
    v-if="orderData.length"
    height="500"
    :page.sync="page"
    :headers="headers"
    :items="orderData"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="mt-6"
    @click:row="goToDetail"
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
import { ref, onBeforeMount, defineEmits } from 'vue';
import { purchaseHistoryAPI } from '@/apis/service/histories/historyApi.js';
import { useRouter } from 'vue-router';

const emit = defineEmits(['historyNo']);

const router = useRouter();
const goToDetail = (e, item) => {
  emit('historyNo', item.item.columns.purchaseHistoryNo);
};
const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'start',
    key: 'productName',
    sortable: false,
    title: '상품정보',
  },
  { title: '주문일자', key: 'createdAt' },
  { title: '주문번호', key: 'purchaseHistoryNo' },
  { title: '주문상태', key: 'label' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const res = await purchaseHistoryAPI(memberId, page.value, itemsPerPage);

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
