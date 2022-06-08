<template>
    <div class="navbar">
        <NavbarHeader 
            :headerList="navbarHeaders" 
            :selectedHeaderItem="selectedHeaderItem"
            @itemSelected="(newItem) => selectedHeaderItem = newItem"
        />
        <div class="navbar__content">
            <NavbarInput v-if="selectedHeaderItem == NavbarHeaderNames.inputs"/>
            <p v-else class="s">navbar__content</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarLayout from "./NavbarLayout"

export default defineComponent(NavbarLayout)
</script>

<style lang="scss" scoped>
@import "./NavbarLayout.scss";
</style>