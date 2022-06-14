<template>
  <div class="navbarproperty">
    <div
      v-if="state.lastSelectedItemId == undefined"
      class="navbarproperty__noitem"
    >
      <p class="navbarproperty__noitem-text">You are not selected any item.</p>
    </div>
    <div v-else class="navbarproperty__inputs">
      <div v-if="currentItem.type == 'Select'" class="navbarproperty__type">
        <!-- TODO: fix naming -->
        <Select2 />
      </div>
      <div v-if="currentItem.type == 'CheckBox'" class="navbarproperty__type">
        <Input
          type="text"
          :properties="{ header: 'Header Name', placeholder: 'Header name...' }"
        />
        <Input
          type="text"
          :properties="{
            header: 'Placeholder Name',
            placeholder: 'Placeholder name...',
          }"
        />
        <div class="values">
          <p class="values__title">Checkbox Values</p>
          <div class="values__item">
            <input
              placeholder="Value..."
              type="text"
              class="values__item-input"
            />
            <div class="values__item-btn">Del</div>
          </div>
          <div class="values__add">
            <div class="values__add-btn">Add New Value</div>
          </div>
        </div>
        <Select title="Active Value" placeholder="No item selected..." />
      </div>
      <div
        v-if="currentItem.type !== 'Select' && currentItem.type !== 'CheckBox'"
        class="navbarproperty__type"
      >
        <Input
          v-for="(input, index) in inputValues"
          :key="input.type"
          :type="input.type"
          :properties="input.properties"
          :style="input.style"
          @onInputChanged="(newValue) => setInputProperties(index, newValue)"
        />
        <Switch
          :title="switchValues.title"
          :keys="switchValues.keys"
          :activeKey="switchValues.activeKey"
          @onSwitch="(newValue) => setSwitchStatus(newValue)"
        />
      </div>
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