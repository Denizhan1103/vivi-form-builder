<template>
    <div class="navbarproperty">
        <div v-if="state.lastSelectedItemId == undefined" class="navbarproperty__noitem">
            <p class="navbarproperty__noitem-text">You are not selected any item.</p>
        </div>
        <div v-else class="navbarproperty__inputs">
            <Input 
                v-for="(input,index) in inputValues" 
                :key="input.type"
                :type="input.type"
                :properties="input.properties"
                :style="input.style"
                @onInputChanged="(newValue) => setInputProperties(index,newValue)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarProperty from "./NavbarProperty"

export default defineComponent(NavbarProperty)
</script>

<style lang="scss" scoped>
@import "./NavbarProperty.scss";
</style>