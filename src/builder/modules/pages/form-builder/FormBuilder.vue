<template>
  <div class="formbuilder">
    <div class="formbuilder__header">
      <h2 class="formbuilder__header-title">Form name:</h2>
      <input
        placeholder="Not set yet"
        type="text"
        class="formbuilder__header-input"
      />
      <div class="formbuilder__header-btns">
        <p class="formbuilder__header-btns-create">Create</p>
        <p class="formbuilder__header-btns-goback">Go back</p>
      </div>
    </div>
    <div class="formbuilder__content">
      <div class="formbuilder__content-area">
        <div v-for="item in 16" :key="item" class="area__item">
          <p class="area__item-index">{{ item }}</p>
          <div class="area__item-input"></div>
          <div class="area__item-btns">
            <p class="area__item-btns-item">Up</p>
            <div class="area__item-btns-item">Down</div>
          </div>
        </div>
      </div>
      <div class="formbuilder__content-navbar">
        <div class="navbar__header">
          <div
            :class="{ 'navbar__header-item-selected': navbarStatus == 'Input' }"
            class="navbar__header-item"
            @click="navbarStatus = 'Input'"
          >
            Inputs
          </div>
          <div
            :class="{
              'navbar__header-item-selected': navbarStatus == 'Prototype',
            }"
            class="navbar__header-item"
            @click="navbarStatus = 'Prototype'"
          >
            Prototype
          </div>
          <div
            :class="{
              'navbar__header-item-selected': navbarStatus == 'Advanced',
            }"
            class="navbar__header-item"
            @click="navbarStatus = 'Advanced'"
          >
            Advanced
          </div>
        </div>
        <div class="navbar__content">
          <div v-if="navbarStatus == 'Input'" class="navbar__content-item">
            <div
              v-for="inputType of inputTypes"
              :key="inputType.id"
              class="navbar__content-btn"
            >
              {{ inputType.name }}
            </div>
          </div>
          <div
            v-if="navbarStatus == 'Prototype'"
            class="navbar__content-item"
          ></div>
          <div
            v-if="navbarStatus == 'Advanced'"
            class="navbar__content-item"
          ></div>
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