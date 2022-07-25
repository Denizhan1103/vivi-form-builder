import { onMounted, onUnmounted, provide, reactive, watch, type PropType } from "vue"

import Main from "../pages/main/Main.vue";
import FormBuilder from "../pages/form-builder/FormBuilder.vue";
import ComponentTest from "../pages/component-test/ComponentTest.vue"

import { CurrentPage } from "../interfaces/AppState"
import eventBus from "../utils/EventBus";

interface Options {
    newItemCreatable: boolean;
    formList: Form[];
    fieldHeaderRequired?: boolean;
}

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
    queue: number;
    type: ItemTypes;
    properties?: ItemProperties;
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

export interface AppState {
    currentPage: CurrentPage;
    options: Options;
}

interface ComponentProperties {
    options: Options;
}

interface CreatedForm {
    id?: number;
    name: string;
    description?: string;
    nameChangable?: boolean;
    deletable?: boolean;
    canStyleChangable?: boolean;
    canValidationChangable?: boolean;
    itemList: Item[];
}

export default {
    components: {
        Main,
        FormBuilder,
        ComponentTest
    },
    props: {
        options: {
            type: Object as PropType<Options>,
            required: false,
            default: { newItemCreatable: true, formList: [], fieldHeaderRequired: false }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const appState = reactive<AppState>({
            currentPage: CurrentPage.main,
            options: props.options
        })

        watch(props, () => {
            appState.options = props.options
        })

        provide('appState', appState)

        const onFormUpdate = (updatedForm: CreatedForm) => {
            emit('onFormUpdate', updatedForm)
            appState.currentPage = CurrentPage.main
        }

        const onFormAdd = (newForm: CreatedForm) => {
            emit('onFormAdd', newForm)
            appState.currentPage = CurrentPage.main
        }

        onMounted(() => {
            eventBus.on('onFormDelete', (formId: number) => emit('onFormDelete', formId))
            eventBus.on('onFormUpdate', (updatedForm: CreatedForm) => onFormUpdate(updatedForm))
            eventBus.on('onFormAdd', (newForm: CreatedForm) => onFormAdd(newForm))
        })

        onUnmounted(() => {
            eventBus.on('onFormDelete', (formId: number) => emit('onFormDelete', formId))
            eventBus.on('onFormUpdate', (updatedForm: CreatedForm) => onFormUpdate(updatedForm))
            eventBus.on('onFormAdd', (newForm: CreatedForm) => onFormAdd(newForm))
        })

        return {
            appState,
            CurrentPage
        }
    },
}