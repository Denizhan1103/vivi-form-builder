import { useDrag } from "@/builder/hooks/UseDrag"
import { ref, watch } from "vue"
import Button from "../../global/button/Button.vue"


export default {
    components: {
        Button
    },
    setup() {
        const { state, updateCurrentFormName, applyCurrentForm } = useDrag()

        const formName = ref<string>(state.currentForm?.name || '')

        watch(formName, (newValue: string) => {
            if (state.currentForm?.nameChangable == true || !state.currentForm) {
                updateCurrentFormName(newValue)
            }
        })

        return {
            formName,
            state,
            applyCurrentForm
        }
    },
}