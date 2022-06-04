<template>
    <div class="input">
        <p class="input__header">{{ properties.header || `${type.charAt(0).toUpperCase() + type.substr(1)} Header` }}
        </p>
        <input v-model="properties.text" :placeholder="properties.placeholder" :type="type" class="input__input" />
        <p class="input__validation">Validation Message</p>
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