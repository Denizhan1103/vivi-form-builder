import type { PropType } from "vue"

import { useDrag } from "@/builder/hooks/UseDrag";

import Input from "@/builder/components/input/Input.vue";
import TextArea from "@/builder/components/text-area/TextArea.vue";

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'Text Area'
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
        TextArea
    },
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true
        }
    },
    setup() {
        const { state, onDragEnter, onDragLeave, onDragStart, setLastSelectedItem, clearSelectedItem } = useDrag()

        return {
            state,
            onDragEnter,
            onDragLeave,
            onDragStart,
            setLastSelectedItem,
            clearSelectedItem
        }
    },
}