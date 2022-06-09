import { ref, watch } from "vue"
import Button from "../../global/button/Button.vue"

interface ComponentProperties {

}

export default {
    components: {
        Button
    },
    setup(props: ComponentProperties, { emit }: any) {
        const formName = ref<string>('')

        watch(formName, (newValue: string) => {
            emit('onFormNameChanged', newValue)
        })

        return {
            formName
        }
    },
}