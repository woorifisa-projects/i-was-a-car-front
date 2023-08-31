<template>
  <v-data-table
    v-if="orderData.length"
    v-model:page="page"
    :headers="headers"
    :items="orderData"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </template>
  </v-data-table>
  {{ orderData }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { } from '@/apis/service/';

const page = ref(1);
const itemsPerPage = 10;

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

async function fetchData() {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const response = await instance.get(
      `/${memberId}/purchase-histories?page=${page.valueu}&size=${itemsPerPage}`
    );

    const data = response.data.data.content;
    orderData.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  fetchData();
});

// const orderData = ref([
//   { name: '아반떼', createdAt: '2023-08-12', purchaseNo: 159, label: '탁송중' },
//   { name: '쏘나타', createdAt: '2023-08-12', purchaseNo: 237, label: '탁송중' },
//   { name: 'G80', createdAt: '2023-08-12', purchaseNo: 262, label: '탁송완료' },
//   { name: '그랜절', createdAt: '2023-08-12', purchaseNo: 305, label: '탁송중' },
//   { name: '싼타페', createdAt: '2023-08-12', purchaseNo: 356, label: '탁송중' },
//   { name: 'K5', createdAt: '2023-08-12', purchaseNo: 375, label: '탁송중' },
//   { name: 'K3', createdAt: '2023-08-12', purchaseNo: 392, label: '탁송중' },
//   { name: 'K9', createdAt: '2023-08-12', purchaseNo: 408, label: '탁송중' },
//   { name: '황마', createdAt: '2023-08-12', purchaseNo: 518, label: '탁송중' },
//   { name: '아반떼', createdAt: '2023-08-12', purchaseNo: 452, label: '탁송중' },
// ]);
</script>

<style lang="scss" scoped></style>
