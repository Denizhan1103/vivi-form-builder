<template>
    <div 
    :style="width.includes('px') ? `width: ${width};` : null" 
    :class="width.includes('Full') ? 'button__full' : 'button__half'" 
    class="button"
    @click="$emit('onButtonClicked')"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from "./Button"

export default defineComponent(Button)
</script>

<style lang="scss" scoped>
@import "./Button.scss";
</style>