<script lang="ts" setup>
import { defineComponent, ref, computed, reactive } from "vue";

import { useDrag } from "@/builder/hooks/UseDrag";

import Input from "../../../../../components/input/Input.vue";
import Select from "../../../../../components/select/Select.vue";
import Switch from "../../../../../modules/global/switch/Switch.vue";

const { state, setProperty, setValueProperty } = useDrag();

const currentItem = computed(() => {
  if (state.lastSelectedItemId !== undefined) {
    let currentItem = undefined;
    state.itemList.forEach((perItem) => {
      if (perItem.id == state.lastSelectedItemId) currentItem = perItem;
    });
    return currentItem;
  }
  return undefined;
});
</script>

<template>
  <div class="propertytype">
    <Input
      type="text"
      :properties="{
        header: 'Header Name',
        placeholder: 'Header name...',
      }"
      @onInputChanged="(newValue) => setProperty('header', newValue)"
    />
    <Input
      type="text"
      :properties="{
        header: 'Placeholder Name',
        placeholder: 'Placeholder name...',
      }"
      @onInputChanged="(newValue) => setProperty('placeholder', newValue)"
    />
    <div class="values">
      <p class="values__title">Select Values</p>
      <div
        v-if="currentItem.properties && currentItem.properties.values"
        class="values__item"
      >
        <div
          v-for="value in currentItem.properties.values"
          :key="value.id"
          class="values__inner"
        >
          <Input
            :properties="{
              header: `Value ${value.id}`,
              placeholder: 'Value...',
            }"
            @onInputChanged="
              (newValue) =>
                setValueProperty({ type: 'Change', key: value.id, newValue })
            "
          />
          <div
            @click="setValueProperty({ type: 'Del', key: value.id })"
            class="values__item-btn"
          >
            Del
          </div>
        </div>
      </div>
      <div class="values__add">
        <div
          @click="setValueProperty({ type: 'Push' })"
          class="values__add-btn"
        >
          Add New Value
        </div>
      </div>
    </div>
    <Select
      title="Active Value"
      placeholder="No item selected..."
      :options="
        currentItem.properties && currentItem.properties.values
          ? currentItem.properties.values
          : undefined
      "
      @onChange="(newValue) => setProperty('activeValue', newValue.id)"
    />
    <Switch
      title="Select Size"
      :keys="['Full', 'Half']"
      :activeKey="
        currentItem.properties && currentItem.properties.size
          ? currentItem.properties.size
          : 'Full'
      "
      @onSwitch="(newValue) => setProperty('size', newValue)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../NavbarProperty.scss";
</style>