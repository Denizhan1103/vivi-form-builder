<template>
    <div class="textarea">
        <p :style="style.header" class="textarea__header">{{ properties.header || `Header Text` }}</p>
        <textarea v-model="textAreaText" :placeholder="properties.placeholder" :style="style.input" class="textarea__input"></textarea>
        <p v-if="validation.enabled" :style="style.validation" class="textarea__validation">Validation Message</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextArea from "./TextArea"

export default defineComponent(TextArea)
</script>

<style lang="scss" scoped>
@import "./TextArea.scss";
</style>