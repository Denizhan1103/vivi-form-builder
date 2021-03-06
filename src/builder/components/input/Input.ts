import { useMessages } from "@/builder/hooks/UseMessages";
import { ref, watch, type PropType } from "vue";
import type { Type, Properties, Style, Validation, ComponentProperties } from "../ComponentInterfaces"

export default {
    props: {
        type: {
            type: String as PropType<Type>,
            required: true
        },
        properties: {
            type: Object as PropType<Properties>,
            required: false
        },
        style: {
            type: Object as PropType<Style>,
            required: false,
            default: { header: {}, input: {}, validation: {} }
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const inputText = ref<string>((props.properties && props.properties.startingText) ? props.properties.startingText : '')
        const messages = useMessages('defaultInputs')

        watch(props, (newValue) => {
            inputText.value = (newValue.properties && newValue.properties.startingText) ? newValue.properties.startingText : ''
        })

        watch(inputText, (newValue: string) => {
            emit('onInputChanged', newValue)
        })

        return {
            inputText,
            messages
        }
    },
}