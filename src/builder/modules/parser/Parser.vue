<template>
  <div v-if="renderType == RenderType.form" class="parser">
    <div
      v-for="item in form.itemList.sort((a, b) => a.queue - b.queue)"
      :key="item.id"
      class="parser__formitem"
    >
      <Input
        v-if="
          item.type !== 'TextArea' &&
          item.type !== 'Select' &&
          item.type !== 'CheckBox'
        "
        :type="item.type"
        :properties="{
          ...item.properties,
          startingText: startValues[item.id] || item.properties.startingText,
        }"
        @onInputChanged="(newValue) => (emittingObjects[item.id] = newValue)"
      />
      <TextArea
        v-if="item.type == 'TextArea'"
        :properties="{
          ...item.properties,
          startingText: startValues[item.id] || item.properties.startingText,
        }"
        @onTextAreaChanged="(newValue) => (emittingObjects[item.id] = newValue)"
      />
      <Select
        v-if="item.type == 'Select'"
        :properties="{
          ...item.properties,
          activeValue: startValues[item.id] || item.properties.activeValue,
        }"
        @onChange="(newValue) => (emittingObjects[item.id] = newValue.id)"
      />
      <CheckBox
        v-if="item.type == 'CheckBox'"
        :properties="{
          ...item.properties,
          activeValue: startValues[item.id] || item.properties.activeValue,
        }"
        @onActiveChanged="(newValue) => (emittingObjects[item.id] = newValue)"
      />
    </div>
  </div>
  <ul v-if="renderType == RenderType.list" class="parser">
    <li
      v-for="item in form.itemList.sort((a, b) => a.queue - b.queue)"
      :key="item.id"
      class="parser__listitem"
    >
      <div class="parser__item-header">
        {{
          item.properties && item.properties.header
            ? item.properties.header
            : messages.title
        }}:
      </div>
      <span
        v-if="item.type == 'Select' || item.type == 'CheckBox'"
        class="parser__item-value"
      >
        {{ calculateValue(item) }}</span
      >
      <span v-else class="parser__item-value">{{ startValues[item.id] }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Parser from "./Parser";

export default defineComponent(Parser);
</script>

<style lang="scss" scoped>
@import "./Parser.scss";
</style>
