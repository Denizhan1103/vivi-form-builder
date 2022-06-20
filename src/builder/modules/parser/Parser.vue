<template>
    <div class="parser">
        <div 
            v-for="item in form.itemList.sort((a,b) => a.queue - b.queue)" 
            :key="item.id" 
            class="parser__item"
        >
            <Input 
                v-if="item.type !== 'TextArea' && item.type !== 'Select' && item.type !== 'CheckBox'"
                :type="item.type"
                :properties="item.properties"
                :preventDefault="true"
                @onInputChanged="(newValue) => emittingObjects[`itemId${item.id}`] = newValue"
            />
            <TextArea 
                v-if="item.type == 'TextArea'"
                :properties="item.properties"
                :preventDefault="true"
                @onTextAreaChanged="(newValue) => emittingObjects[`itemId${item.id}`] = newValue"
                />
            <Select 
                v-if="item.type == 'Select'"
                :properties="item.properties"
                @onChange="(newValue) => emittingObjects[`itemId${item.id}`] = newValue.id"
            />
            <CheckBox 
                v-if="item.type == 'CheckBox'"
                :properties="item.properties"
                @onActiveChanged="(newValue) => emittingObjects[`itemId${item.id}`] = newValue"
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