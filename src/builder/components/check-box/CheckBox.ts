import { onMounted, ref, watch, type PropType } from "vue";

interface Option {
    key: number | string;
    value: string;
}

interface Validation {
    enabled: boolean;
}

interface ComponentProperties {
    title?: string;
    options: Option[];
    activeOption?: number;
    validation?: Validation;
}

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Header Text'
        },
        options: {
            type: Array as PropType<Option[]>,
            required: true
        },
        activeOption: {
            type: Number,
            required: false
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
            if (props.activeOption) currentActiveOption.value = props.activeOption
        })

        onMounted(() => {
            if (props.activeOption) currentActiveOption.value = props.activeOption
        })

        return {
            currentActiveOption
        }
    },
}