<template>
  <div class="radio">
    <div class="radio__title">{{ properties.header || "Header Text" }}</div>
    <div class="radio__inner">
      <div
        class="radio__item"
        v-for="option in properties.options"
        :key="option.key"
        @click="currentActiveOption = option.key"
      >
        <div
          class="radio__item-icon"
          :class="{
            'radio__item-icon-selected': option.key == currentActiveOption,
          }"
        ></div>
        <div
          class="radio__item-text"
          :class="{
            'radio__item-text-selected': option.key == currentActiveOption,
          }"
        >
          {{ option.value }}
        </div>
      </div>
      <div
        v-if="!properties.options || properties.options.length < 1"
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