<template>
  <div>
    <Main v-if="appState.currentPage == CurrentPage.main" />
    <FormBuilder v-if="appState.currentPage == CurrentPage.builder" />
    <ComponentTest v-if="appState.currentPage == CurrentPage.componentTest" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Builder from "./Builder";

export default defineComponent(Builder);
</script>

<style lang="scss">
@import "./Builder.scss";
</style>