<template>
  <div class="select">
    <div class="select__title">{{ properties.header || "Header Text" }}</div>
    <div class="select__inner">
      <select
        @change="(event) => onChange(event.target.value)"
        :disabled="!properties.values || properties.values.length < 1"
        class="select__input"
      >
        <option
          value=""
          class="select__input-item select__input-placeholder"
          disabled
          selected
        >
          {{ properties.placeholder }}
        </option>
        <option
          v-for="value in properties.values"
          :key="value.id"
          class="select__input-item"
          :value="value.id"
          :selected="properties.activeValue && value.id == properties.activeValue"
        >
          {{ value.value }}
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