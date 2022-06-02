import { inject } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState"

export default {
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