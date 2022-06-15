<template>
  <div class="radio">
    <div class="radio__title">{{ properties.header || "Header Text" }}</div>
    <div class="radio__inner">
      <div
        class="radio__item"
        v-for="value in properties.values"
        :key="value.id"
        @click="currentActiveOption = value.id"
      >
        <div
          class="radio__item-icon"
          :class="{
            'radio__item-icon-selected': value.id == currentActiveOption,
          }"
        ></div>
        <div
          class="radio__item-text"
          :class="{
            'radio__item-text-selected': value.id == currentActiveOption,
          }"
        >
          {{ value.value }}
        </div>
      </div>
      <div
        v-if="!properties.values || properties.values.length < 1"
        class="radio__nooption"
      >
        Any option is not set
      </div>
    </div>
    <div v-if="validation.enabled" class="radio__validation">Validation</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckBox from "./CheckBox";

export default defineComponent(CheckBox);
</script>

<style lang="scss" scoped>
@import "./CheckBox.scss";
</style>