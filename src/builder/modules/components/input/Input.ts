import { onMounted, ref, watch, type PropType } from "vue";
import type { Type, Properties, Style, Validation, ComponentProperties } from "../ComponentInterfaces"

export default {
    props: {
        type: {
            type: String as PropType<Type>,
            required: true
        },
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { startingText: '', placeholder: 'Placeholder Message', header: undefined, size: 'Full' }
        },
        style: {
            type: Object as PropType<Style>,
            required: false,
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const inputText = ref<string>(props.properties.startingText || '')

        watch(inputText, (newValue: string) => {
            emit('onInputChanged', newValue)
        })

        return {
            inputText
        }
    },
}