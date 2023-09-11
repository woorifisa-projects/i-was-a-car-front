<template>
  <v-dialog v-model="dialogModel" width="500" :fullscreen="xs">
    <v-card height="690">
      <v-card-title class="text-center text-subtitle font-weight-bold mt-4">
        <v-card-subtitle
          class="text-center font-weight-medium"
          style="opacity: 1"
        >
          I WAS A CAR
        </v-card-subtitle>

        {{ items[0].documentName }}
      </v-card-title>

      <v-card-text class="scrollable-content">
        <template v-for="(item, idx) in items" :key="idx">
          <v-card-text
            v-if="item.documentName == `자동차 매매 계약서` && item.order > 3"
            >{{ item.content }}
          </v-card-text>
          <v-card-text v-if="item.documentName != `자동차 매매 계약서`"
            >{{ item.content }}
          </v-card-text>
        </template>
      </v-card-text>

      <v-card-actions class="fixed-bottom d-flex justify-end">
        <v-btn @click="disagreeEvent" width="100">동의 안함</v-btn>
        <v-btn class="black-btn" @click="agreeEvent" width="100">
          동의 하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  dialog: Boolean,
  xs: Boolean,
  items: Array,
  number: String,
});

const emit = defineEmits(['agreeEvent', 'disagreeEvent']);

const dialogModel = ref(props.dialog);

watchEffect(() => {
  dialogModel.value = props.dialog;
});

const agreeEvent = () => {
  emit('agreeEvent', props.number);
};

const disagreeEvent = () => {
  emit('disagreeEvent', props.number);
};
</script>

<style scoped>
.scrollable-content {
  max-height: calc(100% - 160px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }
}

.fixed-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 5px;
}

.black-btn {
  background-color: black !important;
  color: white !important;
}
</style>
