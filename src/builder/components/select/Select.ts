import type { Prop, PropType } from "vue";

interface Validation {
    enabled: boolean
}

interface Option {
    id: number;
    value: string;
}

interface ComponentProperties {
    properties: Properties;
    validation?: Validation;
}

interface Properties {
    title?: string;
    placeholder?: string;
    options?: Option[];
    activeOption?: string | number;
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { title: undefined, placeholder: undefined, options: [], activeOption: undefined }
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {

        const onChange = (optionKey: string) => {
            if (props.properties && props.properties.options) {
                props.properties.options.forEach((option: Option) => {
                    if (String(option.id) == optionKey) emit('onChange', option)
                })
            }
        }

        return {
            onChange
        }
    },
}