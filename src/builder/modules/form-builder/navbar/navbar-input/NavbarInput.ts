import Button from "@/builder/modules/global/button/Button.vue"

import { useDrag } from "@/builder/hooks/UseDrag"

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'TextArea'
}

interface ButtonItem {
    id: ItemTypes;
    name: string;
}

export default {
    components: {
        Button
    },
    setup() {

        const { onDragStart } = useDrag()

        const buttonList: ButtonItem[] = [
            { id: ItemTypes.text, name: 'Text' },
            { id: ItemTypes.number, name: 'Number' },
            { id: ItemTypes.date, name: 'Date' },
            { id: ItemTypes.time, name: 'Time' },
            { id: ItemTypes.textArea, name: 'Text Area' }
        ]

        return {
            onDragStart,
            buttonList
        }
    },
}