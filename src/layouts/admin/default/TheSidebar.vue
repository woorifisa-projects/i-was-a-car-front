<template>
  <v-card>
    <v-navigation-drawer permanent>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          title="관리자 황철원님"
          prepend-avatar="@/assets/admin-logo.png"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="상품 관리"
          value="productManagement"
          to="."
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="사용자 관리"
          value="memberManagement"
          to="member"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup></script>

<style scoped></style>
