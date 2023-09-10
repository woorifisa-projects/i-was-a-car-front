<template>
  <v-container class="h-screen d-flex flex-column">
    <div class="d-sm-flex justify-sm-center">
      <div class="pb-5">
        <h3 style="text-align: center; margin-bottom: 1.5rem; opacity: 0.7">
          미팅 정보
        </h3>

        <v-table style="width: 400px" class="mx-auto">
          <thead>
            <tr>
              <th style="width: 35%; font-weight: 800">정보</th>
              <th style="width: 65%; font-weight: 800; text-align: right">
                내용
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>판매인</th>

              <th style="text-align: right">
                {{ meetingData.sellerName }}
              </th>
            </tr>

            <tr>
              <th>연락처</th>
              <th style="text-align: right">
                {{ meetingData.sellerTel }}
              </th>
            </tr>

            <tr>
              <th>우편번호</th>
              <th style="text-align: right">{{ meetingData.zipCode }}</th>
            </tr>

            <tr>
              <th>미팅 주소</th>
              <th style="text-align: right">{{ meetingData.address }}</th>
            </tr>

            <tr>
              <th>미팅 예정일</th>
              <th style="text-align: right">
                {{ meetingData.meetingSchedule }}
              </th>
            </tr>
          </tbody>
        </v-table>
      </div>

      <v-divider class="mx-10" inset vertical></v-divider>

      <div class="mb-5">
        <h3 style="text-align: center; margin-bottom: 1.5rem; opacity: 0.7">
          계약정보
        </h3>
        <v-table style="width: 400px" class="mx-auto">
          <thead>
            <tr>
              <th style="width: 35%; font-weight: 800">정보</th>
              <th style="width: 65%; font-weight: 800; text-align: right">
                내용
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>차량명</th>

              <th style="text-align: right">
                {{ contractData.productName }}
              </th>
            </tr>

            <tr>
              <th>계약 일자</th>
              <th style="text-align: right">
                {{ contractData.createdAt }}
              </th>
            </tr>

            <tr>
              <th>차량 가격</th>
              <th style="text-align: right">{{ contractData.productPrice }}</th>
            </tr>

            <tr>
              <th>은행</th>
              <th style="text-align: right">{{ contractData.bankName }}</th>
            </tr>

            <tr>
              <th>예금주</th>
              <th style="text-align: right">
                {{ contractData.accountHolder }}
              </th>
            </tr>

            <tr>
              <th>계좌번호</th>
              <th style="text-align: right">
                {{ contractData.accountNum }}
              </th>
            </tr>

            <tr>
              <th>차량 심사 상태</th>
              <th style="text-align: right">
                <v-chip
                  :color="getColor(contractData.labelName)"
                  variant="outlined"
                >
                  {{ contractData.labelName }}
                </v-chip>
              </th>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <div style="text-align: center; margin-top: 2rem">
      <v-btn
        width="180"
        size="large"
        class="bg-black font-weight-black my-2 mb-10"
        @click="$emit('historyList')"
      >
        목록으로
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { saleHistoryDetailAPI } from '@/apis/service/histories/historyApi';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const { authInfo } = storeToRefs(auth);

const route = useRoute();
const emit = defineEmits(['historyList']);

const saleHistoryNo = route.params.id;

const meetingData = ref({});
const contractData = ref({});

const fetchData = async () => {
  try {
    const memberId = authInfo.value.id;
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

const getColor = (label) => {
  if (label === '심사완료' || label === '탁송완료' || label === '판매완료')
    return 'success';
  else if (label === '심사중' || label === '심사대기중' || label === '탁송중')
    return 'blue';
  else return 'error';
};
</script>

<style lang="scss" scoped></style>
