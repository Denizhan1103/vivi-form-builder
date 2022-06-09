<template>
    <div class="navbarstyle">
        <Select :options="[{key:1,value:'Alo1'},{key:2,value:'Alo2'}]" :activeOption="2"/>
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