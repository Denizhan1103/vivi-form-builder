import { onMounted, reactive, ref, watch } from "vue"

import Input from "@/builder/components/input/Input.vue"
import Switch from "@/builder/modules/global/switch/Switch.vue"

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

interface SwitchValues {
    title: string;
    keys: SwitchKeys[];
    activeKey: SwitchKeys;
}

enum SwitchKeys {
    full = 'Full',
    half = 'Half'
}

export default {
    components: {
        Input,
        Switch
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

        const switchValues = reactive<SwitchValues>({
            title: 'Input Size',
            keys: [SwitchKeys.full, SwitchKeys.half],
            activeKey: SwitchKeys.full
        })

        const getInputProperties = () => {
            const itemProperties = getProperties()
            if (itemProperties !== undefined) {
                inputValues.value[0].properties.startingText = itemProperties.header
                inputValues.value[1].properties.startingText = itemProperties.placeholder
                inputValues.value[2].properties.startingText = itemProperties.startingText
                // @ts-ignore
                switchValues.activeKey = itemProperties.size
            } else {
                resetInputProperties()
            }
        }

        const resetInputProperties = () => {
            inputValues.value[0].properties.startingText = undefined
            inputValues.value[1].properties.startingText = undefined
            inputValues.value[2].properties.startingText = undefined
            switchValues.activeKey = SwitchKeys.full
        }

        getInputProperties()

        const setInputProperties = (index: number, newValue: string) => {
            inputValues.value[index].properties.startingText = newValue
            setProperties({
                header: inputValues.value[0].properties.startingText,
                placeholder: inputValues.value[1].properties.startingText,
                startingText: inputValues.value[2].properties.startingText,
                // @ts-ignore
                size: switchValues.activeKey
            })
        }

        const setSwitchStatus = (newValue: string) => {
            // @ts-ignore
            switchValues.activeKey = newValue
            setProperties({
                header: inputValues.value[0].properties.startingText,
                placeholder: inputValues.value[1].properties.startingText,
                startingText: inputValues.value[2].properties.startingText,
                // @ts-ignore
                size: switchValues.activeKey
            })
        }

        watch(state, () => {
            getInputProperties()
        })

        return {
            inputValues,
            state,
            setInputProperties,
            switchValues,
            setSwitchStatus
        }
    },
}