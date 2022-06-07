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
        const { onDragEnter, onDragLeave, onDragStart } = useDrag()

        return {
            onDragEnter,
            onDragLeave,
            onDragStart
        }
    },
}