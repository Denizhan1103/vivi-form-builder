<template>
    <div class="switch">
        <p class="switch__title">{{title}}</p>
        <div class="switch__inner">
            <div class="switch__area">
                <div 
                    v-for="item in keys" 
                    :key="item.accessor"
                    class="switch__item"
                    :class="{'switch__active': activeKey == item.accessor}"
                    @click="$emit('onSwitch',item.accessor)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Switch from "./Switch"

export default defineComponent(Switch)
</script>

<style lang="scss" scoped>
@import "./Switch.scss";
</style>