<template>
  <div
    class="formitem"
    :class="{ formitem__selected: state.lastSelectedItemId == item.id }"
  >
    <div
      draggable="true"
      @dragstart="(event) => onDragStart({ event, isLayoutItem: true })"
      @click="
        state.lastSelectedItemId == item.id
          ? clearSelectedItem()
          : setLastSelectedItem(item.id)
      "
      class="formitem__draggable"
    >
      <div
        @dragenter="
          (event) => onDragEnter({ event, className: 'formitem__over' })
        "
        @dragleave="
          (event) => onDragLeave({ event, className: 'formitem__over' })
        "
        class="formitem__layer"
      ></div>
      <p class="formitem__id">{{ item.id }}</p>
      <div class="formitem__input">
        <div
          class="formitem__input-item"
          :class="{
            'formitem__input-item-half':
              item.properties && item.properties.size == 'Half',
          }"
        >
          <TextArea
            v-if="item.type == 'TextArea'"
            :properties="item.properties"
          />
          <Select
            v-if="item.type == 'Select'"
            :properties="item.properties"
            :title="
              item.properties && item.properties.header
                ? item.properties.header
                : undefined
            "
          />
          <CheckBox v-if="item.type == 'CheckBox'" />
          <Input
            v-if="
              item.type !== 'Select' &&
              item.type !== 'TextArea' &&
              item.type !== 'CheckBox'
            "
            :properties="item.properties"
          />
        </div>
        <div class="formitem__input-size">
          <span class="formitem__input-size-item">{{
            item.properties && item.properties.size
              ? item.properties.size
              : "Full"
          }}</span>
          <span class="formitem__input-size-item">{{ item.type }}</span>
        </div>
      </div>
    </div>
    <div class="formitem__navbar">
      <p @click="setCurrentEditItem(item.id)" class="formitem__navbar-item">
        Edit
      </p>
      <p @click="removeItem(item.id)" class="formitem__navbar-item">Delete</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormItem from "./FormItem";

export default defineComponent(FormItem);
</script>

<style lang="scss" scoped>
@import "./FormItem.scss";
</style>