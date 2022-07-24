<template>
    <button 
    :style="width.includes('px') ? `width: ${width};` : null" 
    :class="[width.includes('Full') ? 'button__full' : 'button__half']"
    class="button"
    :disabled="disabled"
    @click="$emit('onButtonClicked')"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from "./Button"

export default defineComponent(Button)
</script>

<style lang="scss" scoped>
@import "./Button.scss";
</style>