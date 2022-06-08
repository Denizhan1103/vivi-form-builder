import { reactive } from "vue"

import { findParentNode } from "../utils/FindParentNode";

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
    properties?: ItemProperties;
}

interface ItemProperties {
    startingText?: string;
    placeholder?: string;
    header?: string;
    size?: ItemSize;
}

enum ItemSize {
    half = 'Half',
    full = 'Full'
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

    // TODO: refactor this code also has some bugs  
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

        // Fixed : TODO: fix issue when item dropped into first upper item
        if (selectedLayoutItem && overedLayoutItem) {
            if (selectedLayoutItem.id == overedLayoutItem.id) {
                state.itemList.push(selectedLayoutItem)
                return true
            }
        }

        // If item dropped into itself
        if (!overedLayoutItem && selectedLayoutItem) overedLayoutItem = { id: selectedLayoutItem.id + 1, type: selectedLayoutItem.type }

        // Calc all of layout item new id
        for (const item of state.itemList) {
            if (overedLayoutItem && selectedLayoutItem) {
                if ((item.id >= Number(overedLayoutItem.id) && item.id < Number(selectedLayoutItem.id))) {
                    item.id = item.id + 1
                }
                if (item.id < Number(overedLayoutItem.id) && item.id >= Number(selectedLayoutItem.id)) {
                    item.id = item.id - 1
                }
            }
        }

        if (overedLayoutItem && selectedLayoutItem) {
            state.itemList.push({ id: overedLayoutItem.id - 1, type: selectedLayoutItem.type })
        }
    }

    const allowDrop = (event: any) => {
        event.preventDefault()
    }

    // Drag Enter & Leave || TODO: FIX PARAMETER TYPING
    const onDragEnter = ({ event, className }: { event: any; className: string; }) => {
        const targetNode = findParentNode({ targetNode: event.target, parentClassName: 'formitem' })
        targetNode.classList.add(className)
        state.lastOveredItemId = targetNode.id
        setLayoutItemClassName(className)
    }

    const onDragLeave = ({ event, className }: { event: any; className: string; }) => {
        const targetNode = findParentNode({ targetNode: event.target, parentClassName: 'formitem' })
        targetNode.classList.remove(className)
        setLayoutItemClassName(className)
    }

    const clearItemEffects = () => {
        const nodeList = document.querySelectorAll('.formitem')
        if (state.layoutItemClassName !== '') nodeList.forEach(perNode => perNode.classList.remove(state.layoutItemClassName))
    }

    // Drag Start
    // TODO: FIX TYPING
    const onDragStart = ({ event, isLayoutItem }: { event: any, isLayoutItem: boolean }) => {
        if (isLayoutItem) event.dataTransfer.setData(DataTransferKey.id, findParentNode({ targetNode: event.target, parentClassName: 'formitem' }).id)
        else event.dataTransfer.setData('type', event.target.id)
    }

    // Selection
    const setLastSelectedItem = (itemId: number) => {
        state.lastSelectedItemId = itemId
    }

    const clearSelectedItem = () => {
        state.lastSelectedItemId = undefined
    }

    // Properties
    // TODO: refactor this code
    const setProperties = (itemProperty: ItemProperties) => {
        state.itemList.forEach((perItem: Item) => {
            if (perItem.id == state.lastSelectedItemId) perItem.properties = itemProperty
        })
    }

    const getProperties = (): ItemProperties | undefined => {
        let currentItem: ItemProperties | undefined = undefined;
        state.itemList.forEach((perItem: Item) => {
            if (perItem.id == state.lastSelectedItemId) {
                currentItem = perItem.properties
            }
        })
        return currentItem
    }

    // General
    const sortAllItems = () => {
        state.itemList = state.itemList.sort((a, b) => a.id - b.id)
    }

    const setLayoutItemClassName = (className: string) => {
        state.layoutItemClassName = className
    }


    // Return
    return {
        state: virtualState,
        onDrop,
        onDragEnter,
        onDragLeave,
        onDragStart,
        allowDrop,
        setLastSelectedItem,
        clearSelectedItem,
        setProperties,
        getProperties
    }
}
