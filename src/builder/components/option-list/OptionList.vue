<template>
  <div class="option">
    <p class="option__title">{{ properties.title || messages.inputValuesTitle }}</p>
    <div v-if="optionList.length > 0" class="option__item">
      <div v-for="value in optionList" :key="value.id" class="option__inner">
        <Input
          type="Text"
          :properties="{
            header: `${messages.inputValuesItemTitle} ${value.id}`,
            placeholder: messages.inputValuesItemPlaceholder,
            startingText: value.value,
          }"
          @onInputChanged="
            (newValue) =>
              optionList.forEach((item) => {
                item.id == value.id ? (item.value = newValue) : null;
              })
          "
        />
        <div
          @click="
            optionList.forEach((item, index) =>
              item.id == value.id ? optionList.splice(index, 1) : null
            )
          "
          class="option__item-btn"
        >
          {{ messages.inputValuesDeleteButton }}
        </div>
      </div>
    </div>
    <div class="option__add">
      <div
        @click="
          optionList.push({
            id: availableId,
            value: '',
          })
        "
        class="option__add-btn"
      >
        {{ messages.inputValuesAddButton }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionList from "./OptionList";

export default defineComponent(OptionList);
</script>

<style lang="scss" scoped>
@import "./OptionList.scss";
</style>