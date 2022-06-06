<template>
    <div class="test">
        <Input v-for="input in inputTestData" :key="input.type" :type="input.type" :properties="input.properties" :validation="input.validation"
            :style="input.style" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ComponentTest from "./ComponentTest"

export default defineComponent(ComponentTest)
</script>

<style lang="scss" scoped>
@import "./ComponentTest.scss";
</style>