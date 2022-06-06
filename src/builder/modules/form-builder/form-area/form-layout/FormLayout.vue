<template>
    <div class="formlayout">
        <div class="formlayout__scroll">
            <FormItem v-for="formItem in formItems" :key="formItem.id"/>  
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