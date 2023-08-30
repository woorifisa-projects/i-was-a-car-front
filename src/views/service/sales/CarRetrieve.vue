<template>
  <div>
    <v-container class="d-flex justify-center h-screen">
      <v-sheet class="mt-5 rounded-xl" :elevation="4" width="500" height="690">
        <v-card-title
          class="text-center text-h5 font-weight-bold ma-15 mb-16 my-15"
        >
          차종 선택
        </v-card-title>
        <v-sheet width="350" class="mx-auto">
          <v-form @submit.prevent>
            
            <PrevNextBtn :next="next"></PrevNextBtn>
          </v-form>
        </v-sheet>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
import FindAddress from '@/components/FindAddress.vue';
import PrevNextBtn from '@/components/common/PrevNextBtn.vue';

import { ref } from 'vue';


</script>

<style lang="scss" scoped></style>
