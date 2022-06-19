<template>
    <div @drop="(e) => onDrop(e)" @dragover="(e) => allowDrop(e)" id="formlayout" class="formlayout">
        <div v-if="state.itemList && state.itemList.length > 0" id="formlayout" class="formlayout__scroll">
            <FormItem v-for="perItem in state.itemList" :key="perItem.queue" :queue="perItem.queue" :item="perItem"/>  
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormLayout from "./FormLayout"

export default defineComponent(FormLayout)
</script>

<style lang="scss" scoped>
@import "./FormLayout.scss";
</style>