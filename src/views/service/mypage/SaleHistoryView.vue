<template>
  <v-data-table
    style="width: 800px"
    height="500"
    v-if="orderData.length"
    :page.sync="page"
    :headers="headers"
    :items="orderData"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="mt-6 mx-auto text-center"
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
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { saleHistoryAPI } from '@/apis/service/histories/historyApi.js';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const { authInfo } = storeToRefs(auth);

const emit = defineEmits(['historyNo']);

const goToDetail = (e, item) => {
  emit('historyNo', item.item.columns.saleHistoryNo);
};

const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'center',
    key: 'productName',
    sortable: false,
    title: '상품정보',
  },
  { align: 'center', title: '등록일자', sortable: false, key: 'createdAt' },
  { align: 'center', title: '상품번호', sortable: false, key: 'saleHistoryNo' },
  { align: 'center', title: '등록상태', sortable: false, key: 'label' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const memberId = authInfo.value.id;
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

const getColor = (label) => {
  if (label === '심사완료' || label === '탁송완료' || label === '판매완료')
    return 'success';
  else if (label === '심사중' || label === '심사대기중' || label === '탁송중')
    return 'blue';
  else return 'error';
};
</script>

<style lang="scss" scoped></style>
