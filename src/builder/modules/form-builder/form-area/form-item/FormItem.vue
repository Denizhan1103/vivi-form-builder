<template>
  <div
    class="formitem"
    :class="{ formitem__selected: state.selectedItemId == item.queue }"
  >
    <div class="formitem__container">
      <div
        draggable="true"
        @dragstart="(event) => onDragStart({ event, isLayoutItem: true })"
        @click="
          state.selectedItemId == item.queue
            ? clearSelectedItem()
            : setSelectedItem(item.queue)
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
        <!--QUEUE -->
        <p class="formitem__id">{{ item.queue }}</p>
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
            />
            <CheckBox
              v-if="item.type == 'CheckBox'"
              :properties="item.properties"
            />
            <Input
              v-if="
                item.type !== 'Select' &&
                item.type !== 'TextArea' &&
                item.type !== 'CheckBox'
              "
              :type="item.type"
              :properties="item.properties"
            />
          </div>
          <div class="formitem__input-size">
            <span class="formitem__input-size-item">{{
              item.properties && item.properties.size
                ? item.properties.size == "Full"
                  ? sizeTypeMessages.inputSizeFull
                  : sizeTypeMessages.inputSizeHalf
                : sizeTypeMessages.inputSizeFull
            }}</span>
            <span class="formitem__input-size-item">{{ currentItemType }}</span>
          </div>
        </div>
      </div>
      <div class="formitem__navbar">
        <p
          @click="setCurrentEditItem(item.queue)"
          class="formitem__navbar-item"
        >
          {{ messages.updateButton }}
        </p>
        <p @click="removeItem(item.queue)" class="formitem__navbar-item">
          {{ messages.deleteButton }}
        </p>
      </div>
    </div>
    <ul v-if="item.errorList" class="formitem__errors">
      <li
        v-for="error in item.errorList"
        :key="error"
        class="formitem__errors-item"
      >
        {{ error }}
      </li>
    </ul>
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
