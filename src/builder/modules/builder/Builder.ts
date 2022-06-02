import { provide, reactive } from "vue"

import Main from "../pages/main/Main.vue";
import FormBuilder from "../pages/form-builder/FormBuilder.vue";

import { CurrentPage } from "../interfaces/AppState"

export interface AppState {
    currentPage: CurrentPage;
}

export default {
    components: {
        Main,
        FormBuilder
    },
    setup() {
        const appState = reactive<AppState>({
            currentPage: CurrentPage.builder
        })

        provide('appState', appState)

        return {
            appState,
            CurrentPage
        }
    },
}