import { reactive, ref } from "vue"

enum InputType {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textarea = 'TextArea'
}

enum NavbarStatus {
    input = 'Input',
    prototype = 'Prototype',
    advanced = 'Advanced'
}

interface InputTypes {
    id: number;
    type: InputType;
    name: string;
}

export default {
    setup() {
        const inputTypes = reactive<InputTypes[]>([
            { id: 0, type: InputType.text, name: 'Text' },
            { id: 1, type: InputType.number, name: 'Number' },
            { id: 2, type: InputType.date, name: 'Date' },
            { id: 3, type: InputType.time, name: 'Time' },
            { id: 4, type: InputType.textarea, name: 'Text Area' },
        ])

        const navbarStatus = ref<NavbarStatus>(NavbarStatus.input)

        return {
            inputTypes,
            navbarStatus,
            NavbarStatus
        }
    },
}