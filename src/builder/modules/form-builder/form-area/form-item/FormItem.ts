import type { PropType } from "vue"

import { useDrag } from "@/builder/hooks/UseDrag";

import Input from "@/builder/components/input/Input.vue";
import TextArea from "@/builder/components/text-area/TextArea.vue";
import Select from "@/builder/components/select/Select.vue";
import CheckBox from "@/builder/components/check-box/CheckBox.vue";
import eventBus from "@/builder/utils/EventBus";
import { useMessages } from "@/builder/hooks/UseMessages";
import { computed } from "@vue/reactivity";

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'Text Area',
    select = 'Select',
    checkBox = 'CheckBox'
}

interface Item {
    id: number;
    type: ItemTypes;
    properties: ItemProperties;
}

interface ItemProperties {
    header?: string;
    placeholder?: string;
    startingText?: string;
    size: ItemSize;
}

enum ItemSize {
    half = 'Half',
    full = 'Full'
}

interface ComponentProperties {
    item: Item;
}

export default {
    components: {
        Input,
        TextArea,
        Select,
        CheckBox
    },
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true
        }
    },
    setup(props: ComponentProperties) {
        const { state, onDragEnter, onDragLeave, onDragStart, setSelectedItem, clearSelectedItem, removeItem } = useDrag()

        const messages = useMessages('builderPage.layout')
        const inputTypeMessages = useMessages('builderPage.inputField')
        const sizeTypeMessages = useMessages('builderPage.propertyField')

        const currentItemType = computed<string>(() => {
            for (const perInput of Object.keys(inputTypeMessages)) {
                const currentKey = perInput.replace('Input', '').charAt(0).toUpperCase() + perInput.replace('Input', '').substring(1)
                if (currentKey == props.item.type) return inputTypeMessages[perInput]
            }
            return props.item.type
        })

        const setCurrentEditItem = (itemQueue: number) => {
            setSelectedItem(itemQueue)
            eventBus.dispatch('changeActiveNavbar', 'Property')
        }

        return {
            state,
            onDragEnter,
            onDragLeave,
            onDragStart,
            setSelectedItem,
            clearSelectedItem,
            setCurrentEditItem,
            removeItem,
            messages,
            inputTypeMessages,
            sizeTypeMessages,
            currentItemType
        }
    },
}