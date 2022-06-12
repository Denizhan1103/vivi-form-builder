<template>
  <div class="main">
    <div class="main__header">
      <div class="main__header-describe">
         <h2 class="main__header-describe-title">Welcome to form builder</h2>
        <p class="main__header-describe-description">You can create form how you want!</p>
      </div>
      <div class="main__header-navbar">
        <Button 
          width="136px"
          @onButtonClicked="routeToBuilder()"
        >Create New One</Button>
      </div>
    </div>
    <div class="main__content">
      <p class="main__content-title">Your forms;</p>
      <div class="main__content-items">
        <div class="item" v-for="item in 8" :key="item">
          <div class="item__describe">
            <div class="item__describe-title">Form {{item}}</div>
            <div class="item__describe-description">Description</div>
          </div>
          <div class="item__navbar">
            <p class="item__navbar-item">Edit</p>
            <p class="item__navbar-item">Delete</p>
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
import Main from "./Main";

export default defineComponent(Main);
</script>

<style lang="scss" scoped>
@import "./Main.scss";
</style>