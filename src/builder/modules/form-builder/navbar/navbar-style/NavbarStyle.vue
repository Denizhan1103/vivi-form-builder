<template>
    <div class="navbarstyle">
        <p class="navbarstyle__text">{{ messages.underConstructor }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarStyle from "./NavbarStyle"

export default defineComponent(NavbarStyle)
</script>

<style lang="scss" scoped>
@import "./NavbarStyle.scss";
</style>