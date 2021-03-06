import { onMounted, reactive, watch, ref } from "vue"

import Input from "@/builder/components/input/Input.vue"
import Switch from "@/builder/modules/global/switch/Switch.vue"
import Select from "@/builder/components/select/Select.vue";
import OptionList from "@/builder/components/option-list/OptionList.vue";

import { useDrag } from "@/builder/hooks/UseDrag";
import { computed } from "@vue/reactivity";
import { useMessages } from "@/builder/hooks/UseMessages";

export enum Type {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    select = 'Select',
    checkBox = 'CheckBox'
}

export enum Size {
    half = 'Half',
    full = 'Full'
}

interface Value {
    id: number;
    value: string;
}

interface InputValues {
    header?: string;
    placeholder?: string;
    startingText?: string;
    values?: Value[];
    activeValue?: Value;
    size?: Size
}

export default {
    components: {
        Input,
        Switch,
        Select,
        OptionList
    },
    setup() {
        const { state, setProperty } = useDrag()
        const messages = useMessages('builderPage.propertyField')

        const inputValues = reactive<InputValues>({
            header: undefined,
            placeholder: undefined,
            startingText: undefined,
            values: [],
            activeValue: undefined,
            size: Size.full
        })

        const currentItem = computed(() => {
            if (state.selectedItemId !== undefined) {
                let currentItem = undefined
                state.itemList.forEach((perItem) => {
                    if (perItem.queue == state.selectedItemId) currentItem = perItem
                })
                // @ts-ignore
                if (currentItem && currentItem.properties) updateInputValues(currentItem.properties)
                // @ts-ignore
                if (currentItem && !currentItem.properties) clearInputValues()
                return currentItem
            }
            return undefined
        })

        const updateInputValues = (itemProperties: InputValues) => {
            inputValues.header = itemProperties.header || undefined
            inputValues.placeholder = itemProperties.placeholder || undefined
            inputValues.startingText = itemProperties.startingText || undefined
            inputValues.values = itemProperties.values || []
            inputValues.activeValue = itemProperties.activeValue || undefined
            inputValues.size = itemProperties.size || Size.full
        }

        const clearInputValues = () => {
            inputValues.header = undefined
            inputValues.placeholder = undefined
            inputValues.startingText = undefined
            inputValues.values = []
            inputValues.activeValue = undefined
            inputValues.size = Size.full
        }

        const updateState = () => {
            setProperty('header', inputValues.header)
            setProperty('placeholder', inputValues.placeholder)
            setProperty('startingText', inputValues.startingText)
            setProperty('values', inputValues.values)
            setProperty('activeValue', inputValues.activeValue)
            setProperty('size', inputValues.size)
        }

        watch(inputValues, () => updateState())

        return {
            state,
            currentItem,
            inputValues,
            messages
        }
    },
}