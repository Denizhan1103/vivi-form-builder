import { type PropType, ref, watch, reactive } from "vue";

import Input from "../../components/input/Input.vue"
import Select from "../../components/select/Select.vue"
import CheckBox from "../../components/check-box/CheckBox.vue"
import TextArea from "../../components/text-area/TextArea.vue"

interface Form {
    id: number;
    name: string;
    description?: string;
    nameChangable?: boolean;
    deletable?: boolean;
    canStyleChangable?: boolean;
    canValidationChangable?: boolean;
    itemList: Item[];
}

interface Item {
    id: number;
    type: ItemTypes;
    properties?: ItemProperties;
}

interface ItemProperties {
    startingText?: string;
    placeholder?: string;
    header?: string;
    size?: ItemSize;
    values?: { id: number, value: string }[];
    activeValue?: { id: number; value: string };
}

enum ItemSize {
    half = 'Half',
    full = 'Full'
}

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'TextArea',
    select = 'Select',
    checkBox = 'CheckBox'
}


export default {
    components: {
        Input,
        TextArea,
        Select,
        CheckBox
    },
    props: {
        form: {
            type: Object as PropType<Form>,
            required: true
        },
    },
    setup(componentProperties: any, { emit }: any) {
        const emittingObjects = reactive<any>({})

        watch(emittingObjects, (newValue: any) => {
            emit('onInputsUpdated', newValue)
        })

        return {
            emittingObjects
        }
    }
}

// export default {
//     components: {
//         Input,
//         TextArea,
//         Select,
//         CheckBox
//     },
//     props: {
//         form: {
//             type: Object as PropType<Form>,
//             required: true
//         },
//     },
//     setup(props: ComponentProperties, { emit }: any) {
//         const emittingObjects = ref<any>({})

//         watch(emittingObjects, (newValue: any) => {
//             console.log('ALOO')
//             emit('onInputsUpdated', newValue)
//         })

//         return {
//             emittingObjects
//         }
//     },
// }