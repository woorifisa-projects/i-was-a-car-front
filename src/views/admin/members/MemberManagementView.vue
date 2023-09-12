<template>
  <div class="center-container">
    <v-sheet>
      <v-chip color="black" label size="large" class="px-10">
        <h3 class="font-weight-bold">사용자 관리</h3>
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
        <template v-slot:item.gender="{ item }">
          <v-icon
            v-if="item.columns.gender === '남자'"
            color="blue"
            size="large"
          >
            mdi-human-male
          </v-icon>

          <v-icon v-else color="red" size="large">mdi-human-female </v-icon>
        </template>

        <template v-slot:item.hasLicense="{ item }">
          <v-icon
            v-if="item.columns.hasLicense === true"
            color="success"
            size="large"
          >
            mdi-check-circle
          </v-icon>

          <v-icon v-else color="red" size="large">mdi-close-circle </v-icon>
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
import { membersAPI } from '@/apis/admin/member/memberAPI';

const page = ref(1);
const itemsPerPage = 8;

const headers = ref([
  {
    align: 'center',
    key: 'email',
    sortable: false,
    title: '이메일',
  },
  { align: 'center', title: '이름', key: 'name', sortable: false },
  { align: 'center', title: '전화번호', key: 'tel', sortable: false },
  { align: 'center', title: '생년월일', key: 'birth', sortable: false },
  { align: 'center', title: '성별', key: 'gender', sortable: false },
  { align: 'center', title: '면허유무', key: 'hasLicense', sortable: false },
  {
    align: 'center',
    title: '회원가입 일자',
    key: 'createdAt',
    sortable: false,
  },
]);

const orderData = ref([]);
const pageCount = ref(1);

const fetchData = async () => {
  try {
    const res = await membersAPI(page.value, itemsPerPage);

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
