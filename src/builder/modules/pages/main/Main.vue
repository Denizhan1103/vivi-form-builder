<template>
  <div class="main">
    <div class="main__header">
      <h2 class="main__header-title">Welcome to form builder</h2>
      <p class="main__header-description">You can create form how you want!</p>
    </div>
    <div class="main__content">
      <p class="main__content-title">Your forms;</p>
      <div class="main__content-items">
        <div class="item" v-for="item in 8" :key="item">
          <p class="item__title">Form {{ item }}</p>
          <div class="item__footer">
            <p class="item__footer-edit">Edit</p>
            <p class="item__footer-delete">Delete</p>
          </div>
        </div>
        <div @click="routeToBuilder()" class="item item__add">
          <span>+</span> Add new item
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "./Main.ts";

export default defineComponent(Main);
</script>

<style lang="scss" scoped>
@import "./Main.scss";
</style>