<template>
  <div class="formbuilder">
    <Header @onGoBack="routeToMain()" class="formbuilder__header"/>
    <div class="formbuilder__content">
      <FormLayout/>
      <NavbarLayout/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormBuilder from "./FormBuilder";

export default defineComponent(FormBuilder);
</script>

<style lang="scss" scoped>
@import "./FormBuilder.scss";
</style>