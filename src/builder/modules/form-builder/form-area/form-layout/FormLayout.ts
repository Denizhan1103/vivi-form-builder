import type { PropType } from "vue";
import FormItem from "../form-item/FormItem.vue"

enum InputType {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textarea = 'TextArea'
}

interface FormItems {
    id: number;
    type: InputType;
}

export default {
    components: {
        FormItem
    },
    props: {
        formItems: {
            type: Array as PropType<FormItems[]>,
            required: true
        }
    },
    setup() {

    },
}