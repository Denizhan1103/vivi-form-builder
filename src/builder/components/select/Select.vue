<template>
  <div class="select">
    <div class="select__title">{{ properties.title || "Header Text" }}</div>
    <div class="select__inner">
      <select
        @change="(event) => onChange(event.target.value)"
        :disabled="!properties.options || properties.options.length < 1"
        class="select__input"
      >
        <option
          v-if="properties.placeholder"
          value=""
          class="select__input-item select__input-placeholder"
          disabled
          selected
        >
          {{ properties.placeholder }}
        </option>
        <option
          v-for="option in properties.options"
          :key="option"
          class="select__input-item"
          :value="option.id"
          :selected="
            properties.activeOption && option.id == properties.activeOption
          "
        >
          {{ option.value }}
        </option>
      </select>
    </div>
    <div v-if="validation.enabled" class="select__validation">Validation</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Select from "./Select";

export default defineComponent(Select);
</script>

<style lang="scss" scoped>
@import "./Select.scss";
</style>