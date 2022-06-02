<template>
  <div>
    <Main v-if="appState.currentPage == CurrentPage.main" />
    <FormBuilder v-if="appState.currentPage == CurrentPage.builder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Builder from "./Builder";

export default defineComponent(Builder);
</script>

<style lang="scss" scoped>
@import "./Builder.scss";
</style>