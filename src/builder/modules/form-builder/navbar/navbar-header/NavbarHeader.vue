<template>
    <div class="navbarheader">
        <div 
            v-for="headerItem in headerList" 
            :key="headerItem.type" 
            class="navbarheader__item"
            :class="{'navbarheader__item-selected': selectedHeaderItem == headerItem.type}"
            @click="(event) => {event.target.scrollIntoView(); $emit('itemSelected', headerItem.type)}"
            >
            {{headerItem.name}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarHeader from "./NavbarHeader"

export default defineComponent(NavbarHeader)
</script>

<style lang="scss" scoped>
@import "./NavbarHeader.scss";
</style>