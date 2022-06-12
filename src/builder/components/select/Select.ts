import type { PropType } from "vue";

interface Validation {
    enabled: boolean
}

interface Option {
    id: number;
    value: string;
}

interface ComponentProperties {
    title?: string;
    placeholder?: string;
    options: Option[];
    activeOption?: string | number;
    validation?: Validation;
}

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Header Text'
        },
        placeholder: {
            type: String,
            required: false
        },
        options: {
            type: Array as PropType<Option[]>,
            required: true
        },
        activeOption: {
            type: [String, Number],
            required: false
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {

        const onChange = (optionKey: string) => {
            props.options.forEach((option: Option) => {
                if (String(option.id) == optionKey) emit('onChange', option)
            })
        }

        return {
            onChange
        }
    },
}