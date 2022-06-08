import { onMounted, ref, watch } from "vue"

import Input from "@/builder/components/input/Input.vue"
import { useDrag } from "@/builder/hooks/UseDrag";

export enum Type {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time'
}

export enum Size {
    half = 'Half',
    full = 'Full'
}

interface InputValue {
    type: Type;
    properties: Properties;
    style?: Style;
}

interface Properties {
    startingText?: string;
    placeholder?: string;
    header?: string;
}

interface Style {
    input?: { height?: string };
}

export default {
    components: {
        Input
    },
    setup() {

        const { state, getProperties, setProperties } = useDrag()

        const inputValues = ref<InputValue[]>([
            {
                type: Type.text,
                properties: {
                    startingText: undefined,
                    placeholder: 'Header name...',
                    header: 'Input header name'
                },
                style: {
                    input: { height: "28px" }
                }
            },
            {
                type: Type.text,
                properties: {
                    startingText: undefined,
                    placeholder: 'Placeholder name...',
                    header: 'Input placeholder name'
                },
                style: {
                    input: { height: "28px" }
                }
            },
            {
                type: Type.text,
                properties: {
                    startingText: undefined,
                    placeholder: 'Input starting text...',
                    header: 'Input Starting text'
                },
                style: {
                    input: { height: "28px" }
                }
            },
        ])

        const getInputProperties = () => {
            console.log('in')
            const itemProperties = getProperties()
            if (itemProperties) {
                inputValues.value[0].properties.startingText = itemProperties.header
                inputValues.value[1].properties.startingText = itemProperties.placeholder
                inputValues.value[2].properties.startingText = itemProperties.startingText
            }
        }

        getInputProperties()

        const setInputProperties = (index: number, newValue: string) => {
            inputValues.value[index].properties.startingText = newValue
            setProperties({
                header: inputValues.value[0].properties.startingText,
                placeholder: inputValues.value[1].properties.startingText,
                startingText: inputValues.value[2].properties.startingText
            })
        }

        watch(state, () => {
            console.log('ALOO')
            getInputProperties()
        })

        return {
            inputValues,
            state,
            setInputProperties
        }
    },
}