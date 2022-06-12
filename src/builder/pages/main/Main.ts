import { inject } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState"

import Button from "@/builder/modules/global/button/Button.vue"

export default {
    components: {
        Button
    },
    setup() {
        const appState = inject('appState') as AppState

        const routeToBuilder = () => {
            appState.currentPage = CurrentPage.builder
        }

        return {
            routeToBuilder
        }
    },
}