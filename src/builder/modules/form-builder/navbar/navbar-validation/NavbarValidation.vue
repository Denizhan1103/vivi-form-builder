<template>
    <div class="navbarvalidation">
        <p class="navbarvalidation__text">{{ messages.underConstructor }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarValidation from "./NavbarValidation"

export default defineComponent(NavbarValidation)
</script>

<style lang="scss" scoped>
@import "./NavbarValidation.scss";
</style>