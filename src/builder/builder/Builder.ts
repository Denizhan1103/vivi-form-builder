import { provide, reactive } from "vue"

import Main from "../pages/main/Main.vue";
import FormBuilder from "../pages/form-builder/FormBuilder.vue";
import ComponentTest from "../pages/component-test/ComponentTest.vue"

import { CurrentPage } from "../interfaces/AppState"

enum InputType {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textarea = 'TextArea'
}


export interface AppState {
    currentPage: CurrentPage;
}

export default {
    components: {
        Main,
        FormBuilder,
        ComponentTest
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