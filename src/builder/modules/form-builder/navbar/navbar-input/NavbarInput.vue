<template>
    <div class="navbarinput">
        <Button 
            v-for="button in buttonList" 
            :key="button.id"
            :id="button.id"
            draggable="true"
            @dragstart="(event) => onDragStart({event,isLayoutItem:false})"
        >
            {{button.name}}
        </Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarInput from "./NavbarInput"

export default defineComponent(NavbarInput)
</script>

<style lang="scss" scoped>
@import "./NavbarInput.scss";
</style>