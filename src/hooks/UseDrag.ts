import { reactive } from "vue"

enum DataTransferKey {
    type = 'type',
    id = 'itemId'
}

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'Text Area'
}

interface State {
    itemList: Item[];
    availableItemId: number;
    lastOveredItemId?: string;
    lastSelectedItemId?: number;
    layoutItemClassName: string;
}

interface Item {
    id: number;
    type: ItemTypes;
}

const state = reactive<State>({
    itemList: [],
    availableItemId: 0,
    lastOveredItemId: undefined,
    lastSelectedItemId: undefined,
    layoutItemClassName: ''
})

export const useDrag = () => {

    // State
    const virtualState = state

    // Drop
    const onDrop = (event: any) => {
        const currentItemType: ItemTypes = event.dataTransfer.getData(DataTransferKey.type)
        const currentItemId: number = event.dataTransfer.getData(DataTransferKey.id)

        // Routing
        if (currentItemType && event.target.id == 'formlayout') addItemToLast(currentItemType)
        else if (currentItemType && state.lastOveredItemId) addItemToLoc(currentItemType)
        else if (currentItemId) changeItemLoc(currentItemId)
        // Finalizing
        clearItemEffects()
        sortAllItems()
        state.lastOveredItemId = undefined
    }

    const addItemToLast = (currentItemType: ItemTypes) => {
        state.itemList.push({ id: state.availableItemId, type: currentItemType })
        state.availableItemId++
    }

    const addItemToLoc = (currentItemType: ItemTypes) => {
        for (const item of state.itemList) {
            if (item.id >= Number(state.lastOveredItemId) + 1) item.id = item.id + 1
        }

        state.itemList.push({ id: Number(state.lastOveredItemId) + 1, type: currentItemType })
        state.availableItemId++
    }

    const changeItemLoc = (currentItemId: number) => {
        let selectedLayoutItem: Item | undefined = undefined
        let overedLayoutItem: Item | undefined = undefined

        // Getting selectedLayoutItem & overedLayoutItem
        for (const [index, item] of state.itemList.entries()) {
            if (item.id == currentItemId) {
                selectedLayoutItem = item
                state.itemList.splice(index, 1)
            }
            // Üstüne bırakılan itemin 1 altındaki itemi almak için +1 var
            if (item.id == Number(state.lastOveredItemId) + 1) overedLayoutItem = item
        }

        // Calc all of layout item new id
        for (const item of state.itemList) {
            if (overedLayoutItem && selectedLayoutItem) {
                if (item.id >= Number(overedLayoutItem.id) && item.id < Number(selectedLayoutItem.id)) {
                    item.id = item.id + 1
                }
            }
        }

        if (overedLayoutItem && selectedLayoutItem) {
            state.itemList.push({ id: overedLayoutItem.id - 1, type: selectedLayoutItem.type })
        }
    }

    const sortAllItems = () => {
        state.itemList = state.itemList.sort((a, b) => a.id - b.id)
    }

    const allowDrop = (event: any) => {
        event.preventDefault()
    }

    // Drag Enter & Leave || TODO: FIX PARAMETER TYPING
    const onDragEnter = ({ event, className }: { event: any; className: string; }) => {
        const targetNode = findAreaItem(event.target)
        targetNode.classList.add(className)
        state.lastOveredItemId = targetNode.id
        setLayoutItemClassName(className)
    }

    const onDragLeave = ({ event, className }: { event: any; className: string; }) => {
        const targetNode = findAreaItem(event.target)
        targetNode.classList.remove(className)
        setLayoutItemClassName(className)
    }

    const setLayoutItemClassName = (className: string) => {
        state.layoutItemClassName = className
    }

    const clearItemEffects = () => {
        const nodeList = document.querySelectorAll('.formitem')
        if (state.layoutItemClassName !== '') nodeList.forEach(perNode => perNode.classList.remove(state.layoutItemClassName))
    }

    const findAreaItem = (targetNode: HTMLElement): any => {
        // Check element has 'area__item' class
        let isAreaItem: boolean | undefined = undefined
        targetNode.classList.forEach(className => { if (className == 'formitem') isAreaItem = true })
        if (isAreaItem) return targetNode
        // Check parent node
        let areaItem: HTMLElement | undefined = undefined
        const parentNode = targetNode.parentElement
        if (parentNode) parentNode.classList.forEach(className => { if (className == 'formitem') areaItem = parentNode })
        if (areaItem) return areaItem
        // Check element is HTML
        if (parentNode?.tagName == 'HTML') return false
        // Recall function
        if (!areaItem && parentNode) return findAreaItem(parentNode)
    }

    // Drag Start
    // TODO: FIX TYPING
    const onDragStart = ({ event, isLayoutItem }: { event: any, isLayoutItem: boolean }) => {
        if (isLayoutItem) event.dataTransfer.setData(DataTransferKey.id, findAreaItem(event.target).id)
        else event.dataTransfer.setData('type', event.target.id)
    }

    // Return
    return {
        state: virtualState,
        onDrop,
        onDragEnter,
        onDragLeave,
        onDragStart,
        allowDrop
    }
}
