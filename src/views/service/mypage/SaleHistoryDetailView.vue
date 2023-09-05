<template>
  <v-container style="height: 50vh" class="h-screen">
    <div class="d-flex justify-space-around">
      <div class="mr-5">
        <h2 style="text-align: center; margin-bottom: 1.5rem">미팅 정보</h2>

        <v-table style="width: 600px" class="mx-auto">
          <thead>
            <tr>
              <th style="width: 55%; font-weight: 800; color: black">정보</th>
              <th style="width: 45%; font-weight: 800; color: black">내용</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>판매인</th>

              <th style="text-align: left">
                {{ meetingData.sellerName }}
              </th>
            </tr>

            <tr>
              <th>연락처</th>
              <th style="text-align: left">
                {{ meetingData.sellerTel }}
              </th>
            </tr>

            <tr>
              <th>우편번호</th>
              <th style="text-align: left">{{ meetingData.zipCode }}</th>
            </tr>

            <tr>
              <th>미팅 주소</th>
              <th style="text-align: left">{{ meetingData.address }}</th>
            </tr>

            <tr>
              <th>미팅 예정일</th>
              <th style="text-align: left">
                {{ meetingData.meetingSchedule }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </div>

      <v-divider class="ms-3" inset vertical></v-divider>

      <div class="ml-5">
        <h2 style="text-align: center; margin-bottom: 1.5rem">계약정보</h2>
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
                {{ contractData.accountNum }}
              </th>
            </tr>

            <tr>
              <th>차량 심사 상태</th>
              <th style="text-align: left">
                {{ contractData.labelName }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <div style="text-align: center; margin-top: 2rem">
      <v-btn
        :width="120"
        size="x-large"
        class="bg-black font-weight-black my-2"
        @click="$emit('historyList')"
      >
        목록으로 가기
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { saleHistoryDetailAPI } from '@/apis/service/histories/historyApi';
import { useRoute } from 'vue-router';

const route = useRoute();
const emit = defineEmits(['historyList']);

const saleHistoryNo = route.params.id;

const meetingData = ref({});
const contractData = ref({});

const fetchData = async () => {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const res = await saleHistoryDetailAPI(memberId, saleHistoryNo);

    meetingData.value = {
      sellerName: res.data.data.sellerName,
      sellerTel: res.data.data.sellerTel,
      zipCode: res.data.data.zipCode,
      address: res.data.data.address,
      meetingSchedule: res.data.data.meetingSchedule,
    };
    contractData.value = {
      productName: res.data.data.productName,
      createdAt: res.data.data.createdAt,
      productPrice: res.data.data.productPrice,
      bankName: res.data.data.bankName,
      accountHolder: res.data.data.accountHolder,
      accountNum: res.data.data.accountNum,
      labelName: res.data.data.labelName,
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
