<template>
  <div>
    <div class="mx-auto mt-10" style="max-width: 800px; font-size: 1.1em">
      <v-table density="compact">
        <thead>
          <tr>
            <th style="width: 70%; font-weight: 800; color: black">회원</th>
            <th style="width: 30%; font-weight: 800; color: black">내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>이름</th>

            <th style="text-align: left">
              <input
                v-model="orderData.name"
                ref="firstInput"
                :readonly="!editable"
              />
            </th>
          </tr>

          <tr>
            <th>이메일</th>
            <th style="text-align: left">
              <input v-model="orderData.email" :readonly="true" />
            </th>
          </tr>

          <tr>
            <th>패스워드</th>
            <th style="text-align: left">
              <input
                type="password"
                v-model="password"
                @input="checkPasswordMatch"
                :readonly="!editable"
              />
            </th>
          </tr>

          <tr>
            <th>패스워드확인</th>
            <th style="text-align: left">
              <input
                type="password"
                v-model="confirmPassword"
                @input="checkPasswordMatch"
                :readonly="!editable"
              />
              <div v-if="passwordMismatch" style="color: red; font-size: 10px">
                비밀번호가 일치하지 않습니다.
              </div>
            </th>
          </tr>

          <tr>
            <th>전화번호</th>
            <th style="text-align: left">
              <input v-model="orderData.tel" :readonly="!editable" />
            </th>
          </tr>

          <tr>
            <th>면허 유무</th>
            <th style="text-align: left">
              <span v-if="!editable">{{
                orderData.hasLicense ? '있음' : '없음'
              }}</span>

              <div v-else>
                <input
                  type="radio"
                  id="license-yes"
                  value="true"
                  v-model="orderData.hasLicense"
                />
                <label for="license-yes">있음</label>
                <input
                  type="radio"
                  id="license-no"
                  v-model="orderData.hasLicense"
                />
                <label for="license-no">없음</label>
              </div>
            </th>
          </tr>

          <tr>
            <th>성별</th>
            <th style="text-align: left">
              <span v-if="!editable">{{
                orderData.gender === '남자' ? '남자' : '여자'
              }}</span>

              <div v-else>
                <input
                  type="radio"
                  id="man"
                  value="남자"
                  v-model="orderData.gender"
                />
                <label for="man">남자</label>
                <input
                  type="radio"
                  id="woman"
                  value="여자"
                  v-model="orderData.gender"
                />
                <label for="license-no">여자</label>
              </div>
            </th>
          </tr>

          <tr>
            <th>최근 접속일</th>
            <th style="text-align: left">
              <input v-model="orderData.lastLoginAt" :readonly="true" />
            </th>
          </tr>

          <tr>
            <th>회원가입일</th>
            <th style="text-align: left">
              <input v-model="orderData.createdAt" :readonly="true" />
            </th>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div style="display: flex; justify-content: center">
      <v-btn
        @click="cancelEditing"
        :width="120"
        size="x-large"
        class="font-weight-black my-2"
      >
        취소
      </v-btn>

      <div style="width: 30px"></div>
      <v-btn
        :disabled="passwordMismatch"
        :width="120"
        size="x-large"
        class="bg-black font-weight-black my-2"
        @click="toggleEditing"
      >
        {{ editable ? '저장하기' : '수정하기' }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, nextTick } from 'vue';
import { memberDetailApi } from '@/apis/service/histories/memberInfoApi.js';

const orderData = ref([]);

const firstInput = ref(null);

const editable = ref(false);

const password = ref();

const confirmPassword = ref();

const fetchData = async () => {
  try {
    const memberId = 1; // 예시로 memberId 설정
    const res = await memberDetailApi(memberId);

    orderData.value = res.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const cancelEditing = () => {
  fetchData();
  editable.value = false;
};

const toggleEditing = () => {
  if (editable.value) {
    editable.value = false;
  } else {
    editable.value = true;

    nextTick(() => {
      firstInput.value.focus();
    });
  }
};

const passwordMismatch = ref(false);

const checkPasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true;
  } else {
    passwordMismatch.value = false;
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.v-table {
  width: 100%; /* 너비 설정 */
  height: 500px; /* 높이 설정 */
}
.v-table th {
  text-align: center;
}

.center {
  text-align: center;
}

th v-text-field {
  width: 100%;
}
</style>
