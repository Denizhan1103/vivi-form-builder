import { ref, watch, type PropType } from "vue"
import type { Properties, Style, Validation } from "../ComponentInterfaces"

interface ComponentProperties {
    properties: Properties;
    style?: Style;
    validation?: Validation
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { startingText: '', placeholder: 'Placeholder Message', header: undefined, size: 'Full' }
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
        const textAreaText = ref<string>(props.properties.startingText || '')

        watch(textAreaText, (newValue: String) => {
            emit('onTextAreaChanged', newValue)
        })

        return {
            textAreaText
        }
    },
}