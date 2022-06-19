import { inject, onMounted, watch } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState"

import Button from "@/builder/modules/global/button/Button.vue"
import eventBus from "@/builder/utils/EventBus"
import { useDrag } from "@/builder/hooks/UseDrag"

export default {
    components: {
        Button
    },
    setup() {
        const appState = inject('appState') as AppState

        const { setNewForm } = useDrag()

        const routeToBuilder = (formId?: number) => {
            if (formId) {
                let currentForm = undefined
                appState.options.formList.forEach((perForm) => {
                    if (perForm.id == formId) currentForm = perForm
                })
                if (currentForm) setNewForm(currentForm)
            }
            appState.currentPage = CurrentPage.builder
        }

        const deleteForm = (formId: number) => {
            eventBus.dispatch('onFormDelete', formId)
        }

        onMounted(() => {
            setNewForm()
        })

        return {
            appState,
            routeToBuilder,
            deleteForm
        }
    },
}