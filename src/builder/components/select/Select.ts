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
    values?: Option[];
    activeValue?: string | number;
}

export default {
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { title: undefined, placeholder: undefined, values: [], activeValue: undefined }
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false,
            default: { enabled: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {

        const onChange = (valueId: string) => {
            if (props.properties && props.properties.values) {
                props.properties.values.forEach((value: Option) => {
                    if (String(value.id) == valueId) emit('onChange', value)
                })
            }
        }

        return {
            onChange
        }
    },
}