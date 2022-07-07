import { useMessages } from "@/builder/hooks/UseMessages";
import { onMounted, ref, watch, type PropType } from "vue";

interface Value {
    id: number | string;
    value: string;
}

interface Validation {
    enabled: boolean;
}

interface ComponentProperties {
    properties: Properties;
    validation?: Validation;
}

interface Properties {
    title?: string;
    values?: Value[];
    activeValue?: number;
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { title: undefined, values: [], activeValue: undefined }
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const messages = useMessages('defaultInputs')

        const currentActiveOption = ref<number>(-1)

        watch(currentActiveOption, (newValue: number) => {
            emit('onActiveChanged', newValue)
        })

        watch(props, () => {
            if (props.properties.activeValue) currentActiveOption.value = props.properties.activeValue
        })

        onMounted(() => {
            if (props.properties.activeValue) currentActiveOption.value = props.properties.activeValue
        })

        return {
            currentActiveOption,
            messages
        }
    },
}