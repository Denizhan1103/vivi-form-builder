import Button from "@/builder/modules/global/button/Button.vue"

import { useDrag } from "@/builder/hooks/UseDrag"
import { useMessages } from "@/builder/hooks/UseMessages";

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'TextArea',
    select = 'Select',
    checkBox = 'CheckBox'
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
        const messages = useMessages('builderPage.inputField')

        const buttonList: ButtonItem[] = [
            { id: ItemTypes.text, name: messages.textInput },
            { id: ItemTypes.number, name: messages.numberInput },
            { id: ItemTypes.date, name: messages.dateInput },
            { id: ItemTypes.time, name: messages.timeInput },
            { id: ItemTypes.textArea, name: messages.textAreaInput },
            { id: ItemTypes.select, name: messages.selectInput },
            { id: ItemTypes.checkBox, name: messages.checkBoxInput }
        ]

        return {
            onDragStart,
            buttonList
        }
    },
}