<template>
  <ProgressSprinner v-if="isLoading" />

  <template v-else>
    <div :key="renderKey">
      <div class="mx-auto mt-10" style="max-width: 750px; font-size: 1.1em">
        <v-table density="compact">
          <thead>
            <tr>
              <th
                class="pl-10"
                style="font-weight: 800; color: black"
                :style="xs ? 'width: 40%' : 'width: 60%'"
              >
                회원
              </th>
              <th
                style="font-weight: 800; color: black"
                :style="xs ? 'width: 60%' : 'width: 40%'"
              >
                내용
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="pl-10 py-3">이름</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  placeholder="홍길동"
                  type="text"
                  v-model="changeName"
                  ref="firstInput"
                  :readonly="!editable"
                />
                <div v-if="!isNameValid" style="color: red; font-size: 10px">
                  한글 문자만 입력해주세요.
                </div>
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">이메일</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  v-model="orderData.email"
                  readonly="true"
                />
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">새로운 비밀번호</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  placeholder="변경할 비밀번호를 입력해주세요."
                  type="password"
                  v-model="password"
                  @input="validatePassword"
                  :readonly="!editable"
                />
                <div
                  v-if="!isPasswordValid"
                  style="color: red; font-size: 10px"
                >
                  비밀번호는 영문 대소문자와 숫자, 특수기호를 각각 적어도 1개
                  이상 포함하고, 길이는 8자 ~ 20자여야 합니다.
                </div>
                <template v-else> </template>
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">비밀번호 확인</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  type="password"
                  v-model="confirmPassword"
                  @input="checkPasswordMatch"
                  :readonly="!editable"
                />
                <div
                  v-if="confirmPassword && passwordMismatch"
                  style="color: red; font-size: 10px"
                >
                  비밀번호가 일치하지 않습니다.
                </div>
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">전화번호</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  v-model="changeTel"
                  :readonly="!editable"
                />
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">면허 유무</th>
              <th style="text-align: left">
                <span v-if="!editable">{{
                  changeHasLicense ? '있음' : '없음'
                }}</span>
                <div v-else>
                  <input
                    type="radio"
                    id="license-yes"
                    value="true"
                    v-model="changeHasLicense"
                  />
                  <label for="license-yes" style="margin-right: 1rem">
                    있음</label
                  >
                  <input
                    type="radio"
                    id="license-no"
                    value="false"
                    v-model="changeHasLicense"
                  />
                  <label for="license-no"> 없음</label>
                </div>
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">성별</th>
              <th style="text-align: left">
                <span v-if="!editable">{{
                  changeGender === '남자' ? '남자' : '여자'
                }}</span>
                <div v-else>
                  <input
                    type="radio"
                    id="man"
                    value="남자"
                    v-model="changeGender"
                  />
                  <label for="man" style="margin-right: 1rem"> 남자</label>
                  <input
                    type="radio"
                    id="woman"
                    value="여자"
                    v-model="changeGender"
                  />
                  <label for="woman"> 여자</label>
                </div>
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">최근 접속일</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  v-model="orderData.lastLoginAt"
                  readonly="true"
                />
              </th>
            </tr>
            <tr>
              <th class="pl-10 py-3">회원가입일</th>
              <th style="text-align: left">
                <input
                  class="w-100"
                  v-model="orderData.createdAt"
                  readonly="true"
                />
              </th>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div style="display: flex; justify-content: center" class="mt-10">
        <template v-if="editable">
          <v-btn
            @click="cancelEditing"
            width="120"
            size="large"
            class="font-weight-black my-2 mt-10"
          >
            취소
          </v-btn>
          <div style="width: 20px"></div>
          <v-btn
            :disabled="false"
            width="120"
            size="large"
            class="font-weight-black my-2 mt-10"
            color="black"
            @click="updateMemberHandler"
          >
            저장
          </v-btn>
        </template>
        <v-btn
          v-if="!editable"
          width="180"
          size="large"
          class="bg-black font-weight-black my-2 mt-10"
          @click="toggleEditing"
        >
          수정하기
        </v-btn>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, onBeforeMount, nextTick, defineProps, watch } from 'vue';
import { memberDetailApi } from '@/apis/service/histories/memberInfoApi.js';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import ProgressSprinner from '@/components/common/ProgressSprinner.vue';
import { useLoadingStore } from '@/store/loading';
import { updateMemberAPI } from '@/apis/service/auth/authApi';

const { xs } = useDisplay();

const auth = useAuthStore();
const { authInfo } = storeToRefs(auth);

const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

const props = defineProps(['clickMember']);

const changeName = ref();
const changeTel = ref();
const changeHasLicense = ref();
const changeGender = ref();

const renderKey = ref(true);
const isDisable = ref(false);

const password = ref();
const confirmPassword = ref();

watch(
  () => props.clickMember,
  () => {
    cancelEditing();
  }
);

const orderData = ref([]);

const firstInput = ref(null);

const isNameValid = ref(true);

const isPasswordValid = ref(true);

const validatePassword = () => {
  const regex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}/;

  if (!regex.test(password.value)) {
    isPasswordValid.value = false;
    isDisable.value = true;
  } else {
    isPasswordValid.value = true;
  }
};

const editable = ref(false);
watch(editable, () => {
  if (editable.value) {
    isDisable.value = true;
  }
});

watch([changeName, changeTel, changeHasLicense, changeGender], () => {
  const regex = /^[가-힣]+$/; // 정규식으로 한글 문자만 허용

  if (
    orderData.value.name === changeName.value &&
    orderData.value.tel === changeTel.value &&
    orderData.value.hasLicense.toString() === changeHasLicense.value &&
    orderData.value.gender === changeGender.value
  ) {
    isDisable.value = true;
  } else {
    isDisable.value = false; // 활성화

    if (!regex.test(changeName.value)) {
      isNameValid.value = false;
      isDisable.value = true;
      return;
    } else {
      isNameValid.value = true;
      if (orderData.value.name === changeName.value) {
        isDisable.value = true;
        return;
      }
    }
  }
});

const fetchData = async () => {
  try {
    const memberId = authInfo.value.id;
    const res = await memberDetailApi(memberId);

    orderData.value = res.data.data;

    changeName.value = res.data.data.name;
    changeTel.value = res.data.data.tel;
    changeHasLicense.value = res.data.data.hasLicense;
    changeGender.value = res.data.data.gender;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const cancelEditing = () => {
  fetchData();
  renderKey.value = !renderKey.value;
  editable.value = false;
  isDisable.value = false;
  isNameValid.value = true;
  password.value = '';
  confirmPassword.value = '';
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
  if (password.value === '' && confirmPassword.value === '') {
    isDisable.value = true;
    passwordMismatch.value = false;
  } else {
    if (password.value != confirmPassword.value) {
      isDisable.value = true;
      passwordMismatch.value = true;
    } else {
      isDisable.value = false;
      passwordMismatch.value = false;
    }
  }
};

onBeforeMount(() => {
  fetchData();
  isDisable.value = false;
});

const updateMemberHandler = async () => {
  try {
    const body = {
      name: changeName.value,
      password: password.value,
      tel: changeTel.value,
      gender: changeGender.value,
      hasLicense: changeHasLicense.value,
    };

    const { data } = await updateMemberAPI(body);
    editable.value = false;
  } catch (e) {
    console.error('updateMemberHandler: ', e);
  }
};
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
