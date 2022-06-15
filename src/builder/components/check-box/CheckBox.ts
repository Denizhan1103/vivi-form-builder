import { onMounted, ref, watch, type PropType } from "vue";

interface Option {
    key: number | string;
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
    options?: Option[];
    activeOption?: number;
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { title: undefined, options: [], activeOption: undefined }
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const currentActiveOption = ref<number>(-1)

        watch(currentActiveOption, (newValue: number) => {
            emit('optionChanged', newValue)
        })

        watch(props, () => {
            if (props.properties.activeOption) currentActiveOption.value = props.properties.activeOption
        })

        onMounted(() => {
            if (props.properties.activeOption) currentActiveOption.value = props.properties.activeOption
        })

        return {
            currentActiveOption
        }
    },
}