<template>
  <div class="propertytype">
    <Input
      type="text"
      :properties="{
        header: 'Header Name',
        placeholder: 'Header name...',
        startingText: inputValues.header,
      }"
      @onInputChanged="(newValue) => (inputValues.header = newValue)"
    />
    <Input
      type="text"
      :properties="{
        header: 'Placeholder Name',
        placeholder: 'Placeholder name...',
        startingText: inputValues.placeholder,
      }"
      @onInputChanged="(newValue) => (inputValues.placeholder = newValue)"
    />
    <div class="values">
      <p class="values__title">Select Values</p>
      <div v-if="inputValues.values.length > 0" class="values__item">
        <div
          v-for="value in inputValues.values"
          :key="value.id"
          class="values__inner"
        >
          <Input
            :properties="{
              header: `Value ${value.id}`,
              placeholder: 'Value...',
              startingText: value.value,
            }"
            @onInputChanged="
              (newValue) =>
                inputValues.values.forEach((item) => {
                  item.id == value.id ? (item.value = newValue) : null;
                })
            "
          />
          <div
            @click="
              inputValues.values.forEach((item, index) =>
                item.id == value.id ? inputValues.values.splice(index, 1) : null
              )
            "
            class="values__item-btn"
          >
            Del
          </div>
        </div>
      </div>
      <div class="values__add">
        <div
          @click="
            inputValues.values.push({
              id: availableId,
              value: '',
            });
            availableId++;
          "
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

<script lang="ts">
import { defineComponent, computed, ref, reactive, watch } from "vue";
import { useDrag } from "@/builder/hooks/UseDrag";

import Input from "../../../../../components/input/Input.vue";
import Select from "../../../../../components/select/Select.vue";
import Switch from "../../../../../modules/global/switch/Switch.vue";

export enum Type {
  text = "Text",
  number = "Number",
  date = "Date",
  time = "Time",
  select = "Select",
  checkBox = "CheckBox",
}

export enum Size {
  half = "Half",
  full = "Full",
}

interface InputValue {
  type: Type;
  properties: Properties;
  style?: Style;
}

interface Properties {
  startingText?: string;
  placeholder?: string;
  header?: string;
}

interface Style {
  input?: { height?: string };
}

interface SwitchValues {
  title: string;
  keys: SwitchKeys[];
  activeKey: SwitchKeys;
}

enum SwitchKeys {
  full = "Full",
  half = "Half",
}

export default defineComponent({
  components: {
    Input,
    Select,
    Switch,
  },
  setup() {
    const { state, setProperty } = useDrag();

    const inputValues = reactive({
      header: undefined,
      placeholder: undefined,
      values: [],
    });

    const availableId = computed(() => {
      let availableId = 1;
      if (inputValues.values.length < 1) return availableId;
      inputValues.values.forEach((item) => {
        if (item.id > availableId) availableId = item.id;
      });
      return availableId + 1;
    });

    const currentItem = computed(() => {
      if (state.lastSelectedItemId !== undefined) {
        let currentItem = undefined;
        state.itemList.forEach((perItem) => {
          if (perItem.id == state.lastSelectedItemId) currentItem = perItem;
        });
        setInputValues(currentItem.properties);
        return currentItem;
      }
      return undefined;
    });

    const setInputValues = (properties) => {
      if (properties) {
        inputValues.header = properties.header || undefined;
        inputValues.placeholder = properties.placeholder || undefined;
        inputValues.values = properties.values || [];
      } else {
        inputValues.header = undefined;
        inputValues.placeholder = undefined;
        inputValues.values = [];
      }
    };

    watch(inputValues, () => {
      setProperty("header", inputValues.header);
      setProperty("placeholder", inputValues.placeholder);
      setProperty("values", inputValues.values);
    });

    return {
      state,
      setProperty,
      currentItem,
      inputValues,
      availableId,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../NavbarProperty.scss";
</style>