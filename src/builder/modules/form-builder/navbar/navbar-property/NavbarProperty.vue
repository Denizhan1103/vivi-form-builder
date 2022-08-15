<template>
  <div class="navbarproperty">
    <div
      v-if="state.selectedItemId == undefined"
      class="navbarproperty__noitem"
    >
      <p class="navbarproperty__noitem-text">{{ messages.notSelectAnyItem }}</p>
    </div>
    <div v-else class="navbarproperty__inputs">
      <Input
        type="Text"
        :properties="{
          header: messages.titleTitle,
          placeholder: messages.titlePlaceholder,
          startingText: inputValues.header,
        }"
        :style="{ input: { height: '28px' } }"
        @onInputChanged="(newValue) => setInputValue('header', newValue)"
      />
      <Input
        type="Text"
        v-if="inputValues.type !== 'CheckBox'"
        :properties="{
          header: messages.placeholderTitle,
          placeholder: messages.placeholderPlaceholder,
          startingText: inputValues.placeholder,
        }"
        :style="{ input: { height: '28px' } }"
        @onInputChanged="(newValue) => setInputValue('placeholder', newValue)"
      />
      <Input
        :type="inputValues.type"
        v-if="inputValues.type !== 'CheckBox' && inputValues.type !== 'Select'"
        :properties="{
          header: messages.startingTextTitle,
          placeholder: messages.startingTextPlaceholder,
          startingText: inputValues.startingText,
        }"
        :style="{ input: { height: '28px' } }"
        @onInputChanged="(newValue) => setInputValue('startingText', newValue)"
      />
      <OptionList
        v-if="inputValues.type == 'Select' || inputValues.type == 'CheckBox'"
        :properties="{
          title: messages.inputValuesTitle,
          options: inputValues.values,
        }"
        @onOptionChanged="(newValue) => setInputValue('values', newValue)"
      />
      <Select
        v-if="inputValues.type == 'Select' || inputValues.type == 'CheckBox'"
        :properties="{
          header: messages.startingItemTitle,
          placeholder: messages.startingItemPlaceholder,
          values: inputValues.values,
          activeValue: inputValues.activeValue,
        }"
        @onChange="(newValue) => setInputValue('activeValue', newValue)"
      />
      <Switch
        :title="messages.inputSizeTitle"
        :keys="[
          { name: messages.inputSizeFull, accessor: 'Full' },
          { name: messages.inputSizeHalf, accessor: 'Half' },
        ]"
        :activeKey="inputValues.size || 'Full'"
        @onSwitch="(newValue) => setInputValue('size', newValue)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarProperty from "./NavbarProperty";

export default defineComponent(NavbarProperty);
</script>

<style lang="scss" scoped>
@import "./NavbarProperty.scss";
</style>
