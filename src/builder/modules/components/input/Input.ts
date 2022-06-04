import type { PropType } from "vue";

enum Type {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time'
}

interface Style {
    bgColor?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    height?: number;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    headerColor?: string;
    headerSize?: number;
    placeholderColor?: string;
    placeholderSize?: number;
    hoverBgColor?: string;
    hoverBorderColor?: string;
    hoverColor?: string;
}

interface Validation {
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
    maxDate?: string;
    minDate?: string;
    maxTime?: string;
    minTime?: string;
}

interface Properties {
    text?: string;
    placeholder?: string;
    header?: string;
}

interface ComponentProperties {
    type: Type;
    style: Style;
    properties: Properties;
}

export default {
    props: {
        type: {
            type: String as PropType<Type>,
            required: true
        },
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { text: '', placeholder: 'Placeholder Message', header: undefined }
        },
        style: {
            type: Object as PropType<Style>,
            required: false,
        },
        validation: {
            type: Object as PropType<Validation>,
            required: false
        }
    },
    setup(props: ComponentProperties) { },
}