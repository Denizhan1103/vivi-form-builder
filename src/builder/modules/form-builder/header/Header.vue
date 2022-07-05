<template>
    <div class="header">
        <img @click="onGoBack()" src="../../../assets/header/arrow-back.svg" alt="" class="header__arrow">
        <div class="header__title">
            <h2 class="header__title-text">{{ messages.formName}}:</h2>
            <div class="header__title-input">
                <input 
                    :disabled="state.currentForm?.nameChangable == false" 
                    v-model="formName" 
                    :placeholder="messages.formInputPlaceholder" 
                    type="text" 
                    class="header__title-input-item"
                >
                <img src="../../../assets/header/form.svg" alt="" class="header__title-input-img">
            </div>
        </div>
        <Button class="header__btn" @onButtonClicked="applyCurrentForm()" width="136px">{{messages.saveFormButton || 'Save Current Form'}}</Button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "./Header"

export default defineComponent(Header)
</script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>