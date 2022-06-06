<template>
    <div :class="{'input__half': properties.size == 'Half'}" class="input">
        <p :style="style.header" class="input__header">{{ properties.header || `Header Text` }}</p>
        <input v-model="inputText" :placeholder="properties.placeholder" :type="type" :style="style.input" class="input__input" />
        <p v-if="validation.enabled" :style="style.validation" class="input__validation">Validation Message</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import Input from "./Input.ts";

export default defineComponent(Input);
</script>

<style lang="scss" scoped>
@import "./Input.scss";
</style>