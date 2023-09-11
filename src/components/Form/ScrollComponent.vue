<template>
  <v-virtual-scroll :height="325" :items="finance" class="scrollable-content">
    <template v-slot:default="{ item }">
      <v-list-item
        lines="two"
        :title="`${item.name}`"
        variant="outlined"
        width="96%"
        style="cursor: pointer"
        :class="loan === item.name ? 'set' : 'set2'"
        @click="selectedItem(item)"
      >
        <div v-if="dataType === `loan`">
          <p class="p-style mt-2">
            최대 한도: {{ (item.limit / 10000).toLocaleString() }} 만원
          </p>
          <p class="p-style">
            금리:{{ item.interestRate - 1.5 }}% ~ {{ item.interestRate - 0.2 }}%
          </p>
          <p class="p-style">최대 상환 기간: {{ item.period }} 개월</p>
        </div>

        <div v-if="dataType === `insurance`">
          <p class="p-style mt-2">보험 회사: {{ item.company }}</p>
          <p class="p-style">보장 기간: {{ item.period }} 개월</p>
          <p class="p-style">
            월 납입 금액:
            {{ (item.monthlyPremium / 10000).toLocaleString() }} 만원
          </p>
        </div>
      </v-list-item>
      <br />
    </template>
  </v-virtual-scroll>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['finance', 'dataType']);

const finance = ref(props.finance);
const dataType = ref(props.dataType);

const loan = ref('');

const selectedItem = (item) => {
  loan.value = item.name;
};
</script>

<style lang="scss" scoped>
.set {
  background-color: black;
  border-radius: 10px;
  color: white;
}

.set2 {
  background-color: #fff;
  border-radius: 10px;
  border: 1.5px solid black;
}

.p-style {
  font-size: 14px;
  color: gray;
}

.scrollable-content {
  max-height: calc(100% - 150px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }
}
</style>
