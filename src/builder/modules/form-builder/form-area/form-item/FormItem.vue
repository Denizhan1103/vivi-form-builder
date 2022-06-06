<template>
    <div class="formitem">
        <div draggable="true" class="formitem__draggable">
            <div class="formitem__layer"></div>
            <p class="formitem__id">1</p>
            <div class="formitem__input">
                <div class="formitem__input-item">Input</div>
                <div class="formitem__input-size">Half</div>
            </div>
        </div>
        <div class="formitem__navbar">
            <p class="formitem__navbar-item">Edit</p>
            <p class="formitem__navbar-item">Delete</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormItem from "./FormItem"

export default defineComponent(FormItem)
</script>

<style lang="scss" scoped>
@import "./FormItem.scss";
</style>