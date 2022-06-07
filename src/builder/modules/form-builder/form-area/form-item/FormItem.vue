<template>
    <div class="formitem">
        <div 
            draggable="true" 
            @dragstart="(event) => onDragStart({event,isLayoutItem:true})"
            class="formitem__draggable">
            <div 
                @dragenter="(event) => onDragEnter({event, className:'formitem__over'})" 
                @dragleave="(event) => onDragLeave({event, className:'formitem__over'})" 
                class="formitem__layer">
            </div>
            <p class="formitem__id">{{item.id}}</p>
            <div class="formitem__input">
                <div class="formitem__input-item">
                    <TextArea v-if="item.type == 'TextArea'"/>
                    <Input v-else/>
                </div>
                <div class="formitem__input-size">
                    <span class="formitem__input-size-item">Half</span>
                    <span class="formitem__input-size-item">{{item.type}}</span>
                </div>
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