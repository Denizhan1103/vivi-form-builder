import { inject, provide, reactive, ref, watch } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState";

import Input from "../../components/input/Input.vue"
import Header from "../../modules/form-builder/header/Header.vue";
import FormLayout from "../../modules/form-builder/form-area/form-layout/FormLayout.vue"
import { useDrag } from "@/builder/hooks/UseDrag";

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
    components: {
        Input,
        Header,
        FormLayout
    },
    setup() {
        const appState = inject('appState') as AppState


        const listedItems = ref([
            { id: 0, type: InputType.number },
            { id: 1, type: InputType.text },
            { id: 2, type: InputType.date }
        ])

        provide('formItems', { list: [{ id: 0, type: InputType.number }] })



        const inputTypes = reactive<InputTypes[]>([
            { id: 0, type: InputType.text, name: 'Text' },
            { id: 1, type: InputType.number, name: 'Number' },
            { id: 2, type: InputType.date, name: 'Date' },
            { id: 3, type: InputType.time, name: 'Time' },
            { id: 4, type: InputType.textarea, name: 'Text Area' },
        ])

        const navbarStatus = ref<NavbarStatus>(NavbarStatus.input)

        const propertyInputs = reactive([
            { type: 'Text', size: 'Full', header: 'Header', startingText: '', placeholder: 'Please write header text...' },
            { type: 'Text', size: 'Full', header: 'Placeholder', startingText: '', placeholder: 'Please write placeholder text...' },
            { type: 'Text', size: 'Full', header: 'Starting Text', startingText: '', placeholder: 'Please write starting text...' },
        ])

        const routeToMain = () => {
            console.log('Alo')
            appState.currentPage = CurrentPage.main
        }

        const onDragStart = (e: any, isAreaItem: boolean) => {
            // console.log(e.target)
            if (isAreaItem) {
                const parentNode = findAreaItem(e.target)
                e.dataTransfer.setData('itemId', parentNode.id)
            }
            else e.dataTransfer.setData('type', e.target.id)
        }


        const findAreaItem = (targetNode: HTMLElement): any => {
            // Check element has 'area__item' class
            let isAreaItem: boolean | undefined = undefined
            targetNode.classList.forEach(className => { if (className == 'area__item') isAreaItem = true })
            if (isAreaItem) return targetNode
            // Check parent node
            let areaItem: HTMLElement | undefined = undefined
            const parentNode = targetNode.parentElement
            if (parentNode) parentNode.classList.forEach(className => { if (className == 'area__item') areaItem = parentNode })
            if (areaItem) return areaItem
            // Check element is HTML
            if (parentNode?.tagName == 'HTML') return false
            // Recall function
            if (!areaItem && parentNode) return findAreaItem(parentNode)
        }






        return {
            inputTypes,
            navbarStatus,
            NavbarStatus,
            listedItems,
            propertyInputs,
            routeToMain,
            onDragStart,
        }
    },
}