<template>
  <div class="center-container">
    <v-sheet>
      <v-chip color="black" label size="large" class="px-10">
        <h3 class="font-weight-bold">심사 차량 관리</h3>
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
        @click:row="goToDetail"
      >
        <template v-slot:item.label="{ item }">
          <v-chip :color="getColor(item.columns.label)" variant="outlined">
            {{ item.columns.label }}
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
import { waitingProductsAPI } from '@/apis/admin/products/productAPI';
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
    align: 'center',
    key: 'id',
    sortable: false,
    title: '상품 번호',
  },
  { align: 'center', title: '상품명', key: 'name', sortable: false },
  { align: 'center', title: '브랜드', key: 'brand', sortable: false },
  { align: 'center', title: '심사 여부', key: 'label', sortable: false },
  { align: 'center', title: '가격', key: 'price', sortable: false },
  { align: 'center', title: '연식', key: 'year', sortable: false },
  { align: 'center', title: '주행거리', key: 'distance', sortable: false },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await waitingProductsAPI(page.value, itemsPerPage);

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
  if (label === '심사완료' || label === '탁송완료' || label === '판매완료')
    return 'success';
  else if (label === '심사중') return 'blue';
  else if (label === '탁송중') return 'purple';
  else return 'red';
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
