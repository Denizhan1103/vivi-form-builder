import { inject, reactive, ref, watch } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState";

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
        const appState = inject('appState') as AppState

        const listedItems = ref([
            // { id: 0, type: InputType.number },
            // { id: 1, type: InputType.text },
            // { id: 2, type: InputType.date }
        ])
        let availableItemId: number = listedItems.value.length
        let lastOveredItemId: number | undefined = undefined

        const sortListedItems = () => {
            // @ts-ignore
            listedItems.value = listedItems.value.sort((a, b) => a.id - b.id)
        }

        const inputTypes = reactive<InputTypes[]>([
            { id: 0, type: InputType.text, name: 'Text' },
            { id: 1, type: InputType.number, name: 'Number' },
            { id: 2, type: InputType.date, name: 'Date' },
            { id: 3, type: InputType.time, name: 'Time' },
            { id: 4, type: InputType.textarea, name: 'Text Area' },
        ])

        const navbarStatus = ref<NavbarStatus>(NavbarStatus.input)

        const routeToMain = () => {
            appState.currentPage = CurrentPage.main
        }

        const onDragStart = (e: any) => {
            // console.log(e.target)
            e.dataTransfer.setData('type', e.target.id)
        }

        const onDragEnter = (e: any) => {
            const targetNode = findAreaItem(e.target)
            targetNode.classList.add('drag__over')
            lastOveredItemId = targetNode.id
        }

        const onDragLeave = (e: any) => {
            const targetNode = findAreaItem(e.target)
            targetNode.classList.remove('drag__over')
        }

        const onDrop = (e: any) => {
            // Drop into area
            const currentItemType = e.dataTransfer.getData('type')
            if (currentItemType && e.target.id == 'area') {
                // @ts-ignore
                listedItems.value.push({ id: availableItemId, type: currentItemType })
            }
            // Drop into item
            else if (currentItemType && lastOveredItemId) {
                const virtualListedItems = listedItems.value
                for (let item of virtualListedItems) {
                    // @ts-ignore
                    if (item.id >= Number(lastOveredItemId) + 1) item.id = item.id + 1
                }
                // @ts-ignore
                virtualListedItems.push({ id: Number(lastOveredItemId) + 1, type: currentItemType })
                listedItems.value = virtualListedItems
            }
            // Change locs

            // Last
            sortListedItems()
            availableItemId++
            lastOveredItemId = undefined
            clearItemsBorder()
        }

        const allowDrop = (e: any) => {
            e.preventDefault()
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

        const clearItemsBorder = () => {
            const nodeList = document.querySelectorAll('.area__item')
            nodeList.forEach(perNode => perNode.classList.remove('drag__over'))
        }

        return {
            inputTypes,
            navbarStatus,
            NavbarStatus,
            listedItems,
            routeToMain,
            onDragStart,
            onDragEnter,
            onDragLeave,
            onDrop,
            allowDrop
        }
    },
}