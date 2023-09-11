<template>
  <div class="center-container">
    <v-sheet>
      <h2>상품 관리 페이지</h2>
      <v-data-table
        height="500"
        v-if="orderData.length"
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
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { productsAPI } from '@/apis/admin/products/productAPI';

import { useRouter } from 'vue-router';

const page = ref(1);
const itemsPerPage = 8;
const router = useRouter();
const goToDetail = (e, item) => {
  router.push({
    name: 'ProductManagementDetail',
    params: { id: item.item.columns.id },
  });
};
const headers = ref([
  {
    align: 'start',
    key: 'id',
    sortable: false,
    title: '상품 번호',
  },
  { title: '상품명', key: 'name' },
  { title: '브랜드', key: 'brand' },
  { title: '심사 여부', key: 'label' },
  { title: '가격', key: 'price' },
  { title: '연식', key: 'year' },
  { title: '주행거리', key: 'distance' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await productsAPI(page.value, itemsPerPage);

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

<style lang="scss" scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport Height */
}
</style>
