<template>
    <div class="parser">
        <div 
            v-for="item in form.itemList" 
            :key="item.id" 
            class="parser__item"
        >
            <Input 
                v-if="item.type !== 'TextArea' && item.type !== 'Select' && item.type !== 'CheckBox'"
                :properties="item.properties"
            />
            <TextArea 
                v-if="item.type == 'TextArea'"
                :properties="item.properties"
                />
            <Select 
                v-if="item.type == 'Select'"
                :properties="item.properties"
            />
            <CheckBox 
                v-if="item.type == 'CheckBox'"
                :properties="item.properties"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Parser from "./Parser"

export default defineComponent(Parser)
</script>

<style lang="scss" scoped>
@import "./Parser.scss";
</style>