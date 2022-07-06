import { useMessages } from "@/builder/hooks/UseMessages";
import { ref, watch, type PropType } from "vue"
import type { Properties, Style, Validation } from "../ComponentInterfaces"

interface ComponentProperties {
    properties: Properties;
    style?: Style;
    validation?: Validation;
    preventDefault: boolean;
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { startingText: undefined, placeholder: undefined, header: undefined, size: 'Full' }
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
        },
        preventDefault: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const messages = useMessages('defaultInputs')

        const textAreaText = ref<string | undefined>(props.properties.startingText || undefined)

        watch(props, (newValue: ComponentProperties) => {
            textAreaText.value = newValue.properties.startingText || undefined
        })

        watch(textAreaText, (newValue: string | undefined) => {
            emit('onTextAreaChanged', newValue)
        })

        return {
            textAreaText,
            messages
        }
    },
}