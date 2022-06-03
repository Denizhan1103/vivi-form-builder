<template>
  <div
    class="input"
    :class="{
      input__half: inputValues.size == 'Half',
      input__full: inputValues.size == 'Full',
      input__flex: inputValues.size == 'Flex',
    }"
  >
    <label for="" class="input__title">{{ inputValues.title }}</label>
    <div class="input__container">
      <font-awesome-icon icon="fa-solid fa-eye" />
      <input
        :disabled="disabled == true"
        v-model="inputValues.data"
        :type="inputValues.type"
        :class="{
          'input__data-error': errorList.length > 0,
        }"
        :placeholder="inputValues.placeholder"
        @blur="itemWrited(emit)"
        class="input__data"
      />
      <span v-show="errorList.length > 0" class="input__error-icon">!</span>
    </div>
    <span class="input__error">{{ errorList[0] }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Input from "./Input";

type InputType = "Text" | "Password" | "Date" | "Time" | "Number";
type InputSize = "Full" | "Half" | "Flex";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    inputType: {
      type: String as PropType<InputType>,
      required: true,
    },
    inputSize: {
      type: String as PropType<InputSize>,
      required: true,
    },
    inputTitle: {
      type: String,
      required: true,
    },
    validation: {
      type: Array as PropType<string[]>,
      required: false,
    },
    startingData: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const { inputValues, errorList, itemWrited } = new Input(props, emit);

    return {
      inputValues,
      errorList,
      itemWrited,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./Input.scss";
</style>