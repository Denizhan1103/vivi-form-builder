<template>
  <div class="formbuilder">
    <div class="formbuilder__header">
      <h2 class="formbuilder__header-title">Form name:</h2>
      <input placeholder="Not set yet" type="text" class="formbuilder__header-input" />
      <div class="formbuilder__header-btns">
        <p class="formbuilder__header-btns-create">Create</p>
        <p @click="routeToMain()" class="formbuilder__header-btns-goback">
          Go back
        </p>
      </div>
    </div>
    <div class="formbuilder__content">
      <div @drop="(e) => onDrop(e)" @dragover="(e) => allowDrop(e)" class="formbuilder__content-area" id="area">
        <div v-for="item in listedItems" :key="item.id" class="area__item" draggable="true" :id="item.id"
          @dragenter="(e) => onDragEnter(e)" @dragleave="(e) => onDragLeave(e)" @dragstart="(e) => onDragStart(e, true)"
          @click="lastSelectedItemId = item.id">
          <div class="area__item-layer"></div>
          <p class="area__item-index">{{ item.id }}</p>
          <div class="area__item-input"><Input :type="item.type" /></div>
          <div class="area__item-btns">
            <p class="area__item-btns-item">Up</p>
            <p class="area__item-btns-item">Down</p>
            <p class="area__item-btns-item">Del</p>
          </div>
        </div>
      </div>
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
import FormBuilder from "./FormBuilder.ts";

export default defineComponent(FormBuilder);
</script>

<style lang="scss" scoped>
@import "./FormBuilder.scss";
</style>