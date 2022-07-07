<template>
  <div class="main">
    <div class="main__header">
      <div class="main__header-describe">
         <h2 class="main__header-describe-title">{{ messages.headerTitle }}</h2>
        <p class="main__header-describe-description">{{ messages.headerDescription }}</p>
      </div>
      <div class="main__header-navbar">
        <Button 
          class="main__header-navbar-btn"
          :class="{'main__btn-disable': !appState.options.newItemCreatable}"
          @onButtonClicked="routeToBuilder()"
        >{{ messages.createFormButton }}</Button>
      </div>
    </div>
    <div class="main__content">
      <p class="main__content-title">{{ messages.yourForms }};</p>
      <div class="main__content-items">
        <div 
          v-if="!appState.options.formList || appState.options.formList.length < 1" 
          class="item__noitem item"
        >
          {{ messages.haveZeroForm }}
        </div>
        <div v-else class="item" v-for="form in appState.options.formList" :key="form.id">
          <div class="item__describe">
            <div class="item__describe-title">{{form.name}}</div>
            <div class="item__describe-description">{{form.description || messages.notSetFormDescription}}</div>
          </div>
          <div class="item__navbar">
            <p 
              class="item__navbar-item"
              @click="routeToBuilder(form.id)"
            >
              {{ messages.updateFormButton }}
            </p>
            <p 
              :class="{'item__navbar-item-blur': form.deletable == false}" 
              class="item__navbar-item"
              @click="deleteForm(form.id)"
            >
              {{ messages.deleteFormButton }}
            </p>
          </div>
        </div>
        <div 
          :class="{'main__btn-disable': !appState.options.newItemCreatable}"
          @click="routeToBuilder()" 
          class="item item__add"
        >
          <span>+</span> {{ messages.addFormButton }}
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