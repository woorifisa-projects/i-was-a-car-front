<template>
    <BasicInfo v-if="route.params.id === '1'"></BasicInfo>
    <MeetingLocation v-else-if="route.params.id === '2'"></MeetingLocation>
    <CarRetrieve v-else-if="route.params.id === '3'"></CarRetrieve>
    <CarInfo v-else-if="route.params.id === '4'"></CarInfo>
    <ImageInput v-else-if="route.params.id === '5'"></ImageInput>
    <PriceAndAccount v-else-if="route.params.id === '6'"></PriceAndAccount>
    <ContractForm v-else-if="route.params.id === '7'"></ContractForm>
</template>

<script setup>
import { useRoute } from 'vue-router';
import BasicInfo from './BasicInfo.vue';
import MeetingLocation from './MeetingLocation.vue';
import CarRetrieve from './CarRetrieve.vue';
import CarInfo from './CarInfo.vue';
import ImageInput from './ImageInput.vue';
import PriceAndAccount from './PriceAndAccount.vue';
import ContractForm from './ContractView.vue';

const route = useRoute();

</script>

<style lang="scss" scoped>

</style>