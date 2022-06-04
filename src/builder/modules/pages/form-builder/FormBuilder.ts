import { inject, reactive, ref, watch } from "vue"
import { CurrentPage, type AppState } from "../../interfaces/AppState";

import Input from "../../components/input/Input.vue"

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
        Input
    },
    setup() {
        const appState = inject('appState') as AppState

        const listedItems = ref([
            // { id: 0, type: InputType.number },
            // { id: 1, type: InputType.text },
            // { id: 2, type: InputType.date }
        ])
        let availableItemId: number = listedItems.value.length
        let lastOveredItemId: number | undefined = undefined
        let lastSelectedItemId = ref<number | undefined>(undefined)

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

        const onDragStart = (e: any, isAreaItem: boolean) => {
            // console.log(e.target)
            if (isAreaItem) {
                const parentNode = findAreaItem(e.target)
                e.dataTransfer.setData('itemId', parentNode.id)
            }
            else e.dataTransfer.setData('type', e.target.id)
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
            const itemId = e.dataTransfer.getData('itemId')
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
            else if (itemId) {
                const virtualListedItems = listedItems.value
                // Getting selected ıtem 
                let selectedItem = undefined
                let overedItem = undefined

                for (let [index, item] of virtualListedItems.entries()) {
                    // @ts-ignore
                    if (item.id == itemId) {
                        selectedItem = item
                        virtualListedItems.splice(index, 1)
                    }
                    // @ts-ignore
                    if (item.id == Number(lastOveredItemId) + 1) overedItem = item
                }
                // selectedItem = selected item ; lastOveredItemId = overed item
                console.log(selectedItem)
                console.log(overedItem)

                // 1 den sonraki ve selectedItem.id den önceki herşeyi 1 arttır OK
                for (let item of virtualListedItems) {
                    // @ts-ignore
                    if (item.id >= Number(overedItem.id) && item.id < Number(selectedItem.id)) item.id = item.id + 1
                }
                // @ts-ignore
                console.log({ type: selectedItem.type, id: overedItem.id - 1 })
                // @ts-ignore   
                virtualListedItems.push({ type: selectedItem.type, id: overedItem.id - 1 })
                // selectedItem.id + 1 i bul ve id sini selectedItem.id ile değiştir
                // for (let item of virtualListedItems) {
                //     // @ts-ignore
                //     if (item.id == Number(selectedItem.id) + 1) item.id = selectedItem.id
                // }
                listedItems.value = virtualListedItems
                availableItemId--
                console.log(listedItems.value)
            }
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
            lastSelectedItemId,
            routeToMain,
            onDragStart,
            onDragEnter,
            onDragLeave,
            onDrop,
            allowDrop,
        }
    },
}