import { inject, ref, watch } from "vue"

import { useDrag } from "@/builder/hooks/UseDrag"
import { useMessages } from "@/builder/hooks/UseMessages"

import Button from "../../global/button/Button.vue"

export default {
    components: {
        Button
    },
    setup(props: any, { emit }: any) {
        const messages = useMessages('builderPage.header')

        const { state, updateCurrentFormName, applyCurrentForm, checkCurrentForm } = useDrag()

        const formName = ref<string>(state.currentForm?.name || '')
        const isButtonEnable = ref<boolean>(checkCurrentForm())

        watch(state, () => isButtonEnable.value = checkCurrentForm())

        watch(formName, (newValue: string) => {
            if (state.currentForm?.nameChangable == true || !state.currentForm) {
                updateCurrentFormName(newValue)
            }
        })

        const onGoBack = () => {
            emit('onGoBack')
        }

        return {
            formName,
            state,
            messages,
            isButtonEnable,
            applyCurrentForm,
            onGoBack
        }
    },
}