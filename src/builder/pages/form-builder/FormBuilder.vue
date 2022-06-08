<template>
  <div class="formbuilder">
    <Header @onGoBack="routeToMain()" class="formbuilder__header"/>
    <div class="formbuilder__content">
      <FormLayout :formItems="listedItems"/>
      <div class="formbuilder__content-navbar">
        <div class="navbar__header">
          <div :class="{ 'navbar__header-item-selected': navbarStatus == 'Input' }" class="navbar__header-item"
            @click="navbarStatus = 'Input'">
            Inputs
          </div>
          <div :class="{
            'navbar__header-item-selected': navbarStatus == 'Prototype',
          }" class="navbar__header-item" @click="navbarStatus = 'Prototype'">
            Prototype
          </div>
          <div :class="{
            'navbar__header-item-selected': navbarStatus == 'Advanced',
          }" class="navbar__header-item" @click="navbarStatus = 'Advanced'">
            Advanced
          </div>
        </div>
        <div class="navbar__content">
          <div v-if="navbarStatus == 'Input'" class="navbar__content-item">
            <div draggable="true" v-for="inputType of inputTypes" :key="inputType.id" :id="inputType.type"
              class="navbar__content-btn" @dragstart="(e) => onDragStart(e)">
              {{ inputType.name }}
            </div>
          </div>
          <div v-if="navbarStatus == 'Prototype'" class="navbar__content-item">
            <p v-if="lastSelectedItemId == undefined" class="navbar__content-item-not">
              Any item is not selected
            </p>
            <div v-else class="content">
              <p class="content__header">Properties for item id {{ lastSelectedItemId }}</p>
              <Input v-for="input in propertyInputs" :key="input.header" :property="input" />
            </div>
          </div>
          <div v-if="navbarStatus == 'Advanced'" class="navbar__content-item">
            <p v-if="lastSelectedItemId == undefined" class="navbar__content-item-not">
              Any item is not selected
            </p>
          </div>
        </div>
      </div>
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