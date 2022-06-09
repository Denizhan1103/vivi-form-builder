import { inject } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState";

import Input from "../../components/input/Input.vue"
import Header from "../../modules/form-builder/header/Header.vue";
import FormLayout from "../../modules/form-builder/form-area/form-layout/FormLayout.vue"
import NavbarLayout from "@/builder/modules/form-builder/navbar/navbar-layout/NavbarLayout.vue";

enum NavbarStatus {
    input = 'Input',
    prototype = 'Prototype',
    advanced = 'Advanced'
}

export default {
    components: {
        Input,
        Header,
        FormLayout,
        NavbarLayout
    },
    setup() {
        const appState = inject('appState') as AppState

        const routeToMain = () => {
            console.log('Alo')
            appState.currentPage = CurrentPage.main
        }

        return {
            NavbarStatus,
            routeToMain,
        }
    },
}