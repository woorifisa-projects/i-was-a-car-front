<template>
  <v-container style="height: 50vh" class="h-screen">
    <div>
      <h1 style="text-align: center">탁송정보</h1>

      <v-table style="width: 600px" class="mx-auto">
        <thead>
          <tr>
            <th style="width: 55%; font-weight: 800; color: black">정보</th>
            <th style="width: 45%; font-weight: 800; color: black">내용</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>수령인</th>

            <th style="text-align: left">
              {{ deliveryData.memberName }}
            </th>
          </tr>

          <tr>
            <th>연락처</th>
            <th style="text-align: left">
              {{ deliveryData.memberTel }}
            </th>
          </tr>

          <tr>
            <th>우편번호</th>
            <th style="text-align: left">{{ deliveryData.zipCode }}</th>
          </tr>

          <tr>
            <th>탁송 주소</th>
            <th style="text-align: left">{{ deliveryData.address }}</th>
          </tr>

          <tr>
            <th>탁송 예정일</th>
            <th style="text-align: left">
              {{ deliveryData.deliverySchedule }}
            </th>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div class="mt-10">
      <h1 style="text-align: center">계약정보</h1>
      <v-table style="width: 600px" class="mx-auto">
        <thead>
          <tr>
            <th style="width: 55%; font-weight: 800; color: black">정보</th>
            <th style="width: 45%; font-weight: 800; color: black">내용</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>차량명</th>

            <th style="text-align: left">
              {{ contractData.productName }}
            </th>
          </tr>

          <tr>
            <th>계약 일자</th>
            <th style="text-align: left">
              {{ contractData.createdAt }}
            </th>
          </tr>

          <tr>
            <th>차량 가격</th>
            <th style="text-align: left">{{ contractData.productPrice }}</th>
          </tr>

          <tr>
            <th>은행</th>
            <th style="text-align: left">{{ contractData.bankName }}</th>
          </tr>

          <tr>
            <th>예금주</th>
            <th style="text-align: left">
              {{ contractData.accountHolder }}
            </th>
          </tr>

          <tr>
            <th>계좌번호</th>
            <th style="text-align: left">
              {{ contractData.accountNumber }}
            </th>
          </tr>

          <tr>
            <th>대출 정보</th>
            <th style="text-align: left">
              {{ contractData.loanName }}
            </th>
          </tr>

          <tr>
            <th>보험 정보</th>
            <th style="text-align: left">
              {{ contractData.insuranceName }}
            </th>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div style="text-align: center">
      <v-btn
        :width="120"
        size="x-large"
        class="bg-black font-weight-black my-2"
        @click="$router.push('/mypage')"
      >
        목록으로 가기
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { purchaseHistoryDetailAPI } from '@/apis/service/histories/historyApi';
import { useRoute } from 'vue-router';

const route = useRoute();

const purchaseHistoryNo = route.params.id;

const deliveryData = ref({});
const contractData = ref({});

const fetchData = async () => {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const res = await purchaseHistoryDetailAPI(memberId, purchaseHistoryNo);

    deliveryData.value = {
      memberName: res.data.data.memberName,
      memberTel: res.data.data.memberTel,
      zipCode: res.data.data.zipCode,
      address: res.data.data.address,
      deliverySchedule: res.data.data.deliverySchedule,
    };
    contractData.value = {
      productName: res.data.data.productName,
      createdAt: res.data.data.createdAt,
      productPrice: res.data.data.productPrice,
      bankName: res.data.data.bankName,
      accountHolder: res.data.data.accountHolder,
      accountNumber: res.data.data.accountNumber,
      loanName: res.data.data.loanName,
      insuranceName: res.data.data.insuranceName,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>

<style lang="scss" scoped></style>
