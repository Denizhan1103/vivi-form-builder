<template>
  <div class="navbarproperty">
    <div
      v-if="state.lastSelectedItemId == undefined"
      class="navbarproperty__noitem"
    >
      <p class="navbarproperty__noitem-text">You are not selected any item.</p>
    </div>
    <div v-else class="navbarproperty__inputs">
      <Input 
        type="Text" 
        :properties="{header:'Title',placeholder:'Title...',startingText: inputValues.header}" 
        :style="{input:{height: '28px'}}"
        @onInputChanged="(newValue) => inputValues.header = newValue"
      />
      <Input 
        type="Text" 
        v-if="currentItem.type !== 'CheckBox'" 
        :properties="{header:'Placeholder',placeholder:'Placeholder...',startingText: inputValues.placeholder}" 
        :style="{input:{height: '28px'}}"
        @onInputChanged="(newValue) => inputValues.placeholder = newValue"
      />
      <Input 
        :type="currentItem.type" 
        v-if="currentItem.type !== 'CheckBox' && currentItem.type !== 'Select'" 
        :properties="{header:'Starting Text',placeholder:'Starting Text...',startingText: inputValues.startingText}" 
        :style="{input:{height: '28px'}}"
        @onInputChanged="(newValue) => inputValues.startingText = newValue"
      />
      <OptionList 
        v-if="currentItem.type == 'Select' || currentItem.type == 'CheckBox'" 
        :properties="{title:'Input Values', options: inputValues.values}"
        @onOptionChanged="(newValue) => inputValues.values = newValue"
      />
      <Select 
        v-if="currentItem.type == 'Select' || currentItem.type == 'CheckBox'"
        :properties="{header:'Starting Item', placeholder: 'Starting Item...', values: inputValues.values, activeValue: inputValues.activeValue}"
        @onChange="(newValue) => inputValues.activeValue = newValue.id"
      />
      <Switch 
        title="Input Size" 
        :keys="['Full','Half']"
        :activeKey="inputValues.size"
        @onSwitch="(newValue) => inputValues.size = newValue"
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