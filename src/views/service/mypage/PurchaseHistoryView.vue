<template>
  <ProgressSpinner v-if="isLoading" :isHscreen="true" />

  <template v-else>
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
    <v-container
      v-else
      class="h-screen d-flex flex-column text-center justify-start align-center pt-16"
    >
      <br />
      <br />
      <h2>구매이력이 존재하지 않습니다.</h2>
      <br />
      <br />
      <v-btn
        color="black"
        width="200"
        size="large"
        @click="goToPage"
        class="font-weight-bold"
        >내 차 사기</v-btn
      >
    </v-container>
  </template>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { purchaseHistoryAPI } from '@/apis/service/histories/historyApi.js';
import { useAuthStore } from '@/store/auth.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import ProgressSpinner from '@/components/common/ProgressSprinner.vue';
import { useLoadingStore } from '@/store/loading.js';

const auth = useAuthStore();
const { authInfo } = storeToRefs(auth);

const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

const router = useRouter();

const emit = defineEmits(['historyNo']);

const goToDetail = (e, item) => {
  emit('historyNo', item.item.columns.purchaseHistoryNo);
};
const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'center',
    key: 'productName',
    sortable: false,
    title: '상 품 정 보',
  },
  { align: 'center', title: '주문일자', sortable: false, key: 'createdAt' },
  {
    align: 'center',
    title: '주 문 번 호',
    sortable: false,
    key: 'purchaseHistoryNo',
  },
  { align: 'center', title: '주문상태', sortable: false, key: 'label' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const memberId = authInfo.value.id;
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

const getColor = (label) => {
  if (label === '심사완료' || label === '탁송완료' || label === '판매완료')
    return 'success';
  else if (label === '심사중' || label === '심사대기중' || label === '탁송중')
    return 'blue';
  else return 'error';
};

const goToPage = () => {
  router.push('one-click-purchase/1');
};
</script>

<style lang="scss" scoped></style>
