<template>
    <div class="navbarproperty">
        {{currentItem}} {{state.lastSelectedItemId}}
        <div v-if="state.lastSelectedItemId == undefined" class="navbarproperty__noitem">
            <p class="navbarproperty__noitem-text">You are not selected any item.</p>
        </div>
        <div v-else class="navbarproperty__inputs">
            <div v-if="currentItem.type == 'Select'" class="navbarproperty__type">
                Select
            </div>
            <div v-if="currentItem.type == 'CheckBox'" class="navbarproperty__type">Check box</div>
            <div v-if="currentItem.type !== 'Select' && currentItem.type !== 'CheckBox'" class="navbarproperty__type">
                <Input 
                    v-for="(input,index) in inputValues" 
                    :key="input.type"
                    :type="input.type"
                    :properties="input.properties"
                    :style="input.style"
                    @onInputChanged="(newValue) => setInputProperties(index,newValue)"
                />
                <Switch 
                    :title="switchValues.title" 
                    :keys="switchValues.keys" 
                    :activeKey="switchValues.activeKey"
                    @onSwitch="(newValue) => setSwitchStatus(newValue)"
                />
            </div>
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