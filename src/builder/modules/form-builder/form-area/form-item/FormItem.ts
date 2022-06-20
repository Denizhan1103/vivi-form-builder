import type { PropType } from "vue"

import { useDrag } from "@/builder/hooks/UseDrag";

import Input from "@/builder/components/input/Input.vue";
import TextArea from "@/builder/components/text-area/TextArea.vue";
import Select from "@/builder/components/select/Select.vue";
import CheckBox from "@/builder/components/check-box/CheckBox.vue";
import eventBus from "@/builder/utils/EventBus";

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
    setup() {
        const { state, onDragEnter, onDragLeave, onDragStart, setSelectedItem, clearSelectedItem, removeItem } = useDrag()

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
            removeItem
        }
    },
}