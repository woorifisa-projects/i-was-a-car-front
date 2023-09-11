<template>
  <div class="center-container">
    <v-sheet>
      <h2>회원 목록</h2>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="사용자의 이름을 입력하세요"
        single-line
        hide-details
        style="style=width: 300px"
      ></v-text-field>
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
import { membersAPI } from '@/apis/admin/member/memberAPI';

const search = ref(''); // 검색어 저장
const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'start',
    key: 'email',
    sortable: false,
    title: '이메일',
  },
  { title: '이름', key: 'name' },
  { title: '전화번호', key: 'tel' },
  { title: '생년월일', key: 'birth' },
  { title: '성별', key: 'gender' },
  { title: '면허유무', key: 'hasLicense' },
  { title: '회원가입 일자', key: 'createdAt' },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await membersAPI(page.value, itemsPerPage);

    orderData.value = res.data.data.items;
    Array.from(orderData.value).forEach(
      (element) => (element.hasLicense = element.hasLicense ? '✅' : '❌')
    );
    console.log(orderData.value);
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
