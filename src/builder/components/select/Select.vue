<template>
    <div class="select">
        <div class="select__title">{{title}}</div>
        <div class="select__inner">
            <select 
                @change="(event) => onChange(event.target.value)" 
                :disabled="!options"
                class="select__input"
            >
                <option v-if="placeholder" value="" class="select__input-item select__input-placeholder" disabled selected>{{placeholder}}</option>
                <option 
                    v-for="option in options" 
                    :key="option"
                    class="select__input-item"
                    :value="option.key"
                    :selected="option.key == activeOption"
                >
                    {{option.value}}
                </option>
            </select>
        </div>
        <div v-if="validation.enabled" class="select__validation">Validation</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Select from "./Select"

export default defineComponent(Select)
</script>

<style lang="scss" scoped>
@import "./Select.scss";
</style>