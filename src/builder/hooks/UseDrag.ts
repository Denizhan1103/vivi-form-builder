import { reactive } from "vue"
import eventBus from "../utils/EventBus";

import { findParentNode } from "../utils/FindParentNode";

enum DataTransferKey {
    type = 'type',
    queue = 'queue'
}

// TODO: look
enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'TextArea',
    select = 'Select',
    checkBox = 'CheckBox'
}

interface State {
    itemList: Item[];
    currentForm?: Form;
    availableItemId: number;
    lastOveredItemQueue?: string;
    selectedItemId?: number;
    layoutItemClassName: string;
    updatedFormName?: string;
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

// Form
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

interface Item {
    queue: number;
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

export const state = reactive<State>({
    itemList: [],
    currentForm: undefined,
    availableItemId: 0,
    lastOveredItemQueue: undefined,
    selectedItemId: undefined,
    layoutItemClassName: '',
    updatedFormName: undefined
})

export const useDrag = () => {

    // State
    const virtualState = state

    // Drop
    const onDrop = (event: any) => {
        const currentItemType: ItemTypes = event.dataTransfer.getData(DataTransferKey.type)
        const currentItemQueue: number = event.dataTransfer.getData(DataTransferKey.queue)

        // Routing
        if (currentItemType && event.target.id == 'formlayout') addItemToLast(currentItemType)
        else if (currentItemType && state.lastOveredItemQueue) addItemToLoc(currentItemType)
        else if (currentItemQueue) changeItemLoc(currentItemQueue)
        // Finalizing
        clearItemEffects()
        sortAllItems()
        state.lastOveredItemQueue = undefined
    }

    const addItemToLast = (currentItemType: ItemTypes) => {
        state.itemList.push({ queue: state.availableItemId, type: currentItemType })
        state.availableItemId++
    }

    const addItemToLoc = (currentItemType: ItemTypes) => {
        for (const item of state.itemList) {
            if (item.queue >= Number(state.lastOveredItemQueue) + 1) item.queue = item.queue + 1
        }

        state.itemList.push({ queue: Number(state.lastOveredItemQueue) + 1, type: currentItemType })
        state.availableItemId++
    }

    // TODO: refactor this code also has some bugs  
    const changeItemLoc = (currentItemId: number) => {
        let selectedLayoutItem: Item | undefined = undefined
        let overedLayoutItem: Item | undefined = undefined

        // Getting selectedLayoutItem & overedLayoutItem
        for (const [index, item] of state.itemList.entries()) {
            if (item.queue == currentItemId) {
                selectedLayoutItem = item
                state.itemList.splice(index, 1)
            }
            // Üstüne bırakılan itemin 1 altındaki itemi almak için +1 var
            if (item.queue == Number(state.lastOveredItemQueue) + 1) overedLayoutItem = item
        }

        // Fixed : TODO: fix issue when item dropped into first upper item
        if (selectedLayoutItem && overedLayoutItem) {
            if (selectedLayoutItem.queue == overedLayoutItem.queue) {
                state.itemList.push(selectedLayoutItem)
                return true
            }
        }

        // If item dropped into itself
        if (!overedLayoutItem && selectedLayoutItem) overedLayoutItem = { ...selectedLayoutItem, queue: selectedLayoutItem.queue + 1, type: selectedLayoutItem.type }

        // Calc all of layout item new queue
        for (const item of state.itemList) {
            if (overedLayoutItem && selectedLayoutItem) {
                if ((item.queue >= Number(overedLayoutItem.queue) && item.queue < Number(selectedLayoutItem.queue))) {
                    item.queue = item.queue + 1
                }
                if (item.queue < Number(overedLayoutItem.queue) && item.queue >= Number(selectedLayoutItem.queue)) {
                    item.queue = item.queue - 1
                }
            }
        }

        if (overedLayoutItem && selectedLayoutItem) {
            state.itemList.push({ ...selectedLayoutItem, queue: overedLayoutItem.queue - 1, type: selectedLayoutItem.type })
        }

    }

    const allowDrop = (event: any) => {
        event.preventDefault()
    }

    // Drag Enter & Leave || TODO: FIX PARAMETER TYPING
    const onDragEnter = ({ event, className }: { event: any; className: string; }) => {
        const targetNode = findParentNode({ targetNode: event.target, parentClassName: 'formitem' })
        targetNode.classList.add(className)
        state.lastOveredItemQueue = targetNode.getAttribute('queue')
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
        clearSelectedItem()
        if (isLayoutItem) event.dataTransfer.setData(DataTransferKey.queue, findParentNode({ targetNode: event.target, parentClassName: 'formitem' }).getAttribute('queue'))
        // Change Id to Type From Dom
        else event.dataTransfer.setData('type', event.target.id)
    }

    // Selection
    const setSelectedItem = (itemId: number) => {
        state.selectedItemId = itemId
    }

    const clearSelectedItem = () => {
        state.selectedItemId = undefined
    }

    // Remove
    const removeItem = (itemId: number) => {
        // Remove Item
        state.itemList.forEach((perItem: Item, index: number) => {
            if (perItem.queue == itemId) state.itemList.splice(index, 1)
        })

        // Set new index
        state.itemList.forEach((perItem: Item) => {
            if (perItem.queue > itemId) perItem.queue--
        })

        sortAllItems()
        clearSelectedItem()
        state.availableItemId--
    }

    // Properties
    // TODO: refactor this code
    const setProperties = (itemProperty: ItemProperties) => {
        state.itemList.forEach((perItem: Item) => {
            if (perItem.queue == state.selectedItemId) perItem.properties = itemProperty
        })
    }

    const setProperty = (key: string, value: any) => {
        state.itemList.forEach((perItem: Item, index: number) => {
            // TODO: write an enum
            if (perItem.queue == state.selectedItemId) {
                if (!perItem.properties) perItem.properties = {}
                // @ts-ignore
                perItem.properties[key] = value
                // state.itemList[index].properties[key] = value
            }
        })
    }

    const getProperties = (): ItemProperties | undefined => {
        let currentItem: ItemProperties | undefined = undefined;
        state.itemList.forEach((perItem: Item) => {
            if (perItem.queue == state.selectedItemId) {
                currentItem = perItem.properties
            }
        })
        return currentItem
    }

    // General
    const sortAllItems = () => {
        state.itemList = state.itemList.sort((a, b) => a.queue - b.queue)
    }

    const setLayoutItemClassName = (className: string) => {
        state.layoutItemClassName = className
    }

    const setNewForm = (form?: Form) => {
        state.updatedFormName = undefined
        if (form == undefined) {
            state.itemList = []
            state.currentForm = undefined
            state.availableItemId = 0
            return
        }
        state.itemList = form.itemList ? Object.assign([], form.itemList) : []
        state.currentForm = form
        // Find currentAvailableId 
        state.itemList.length > 0 ? state.itemList.forEach(perItem => {
            if (perItem.queue >= state.availableItemId) state.availableItemId = perItem.queue + 1
        }) : state.availableItemId = 0
    }

    const updateCurrentFormName = (newFormName: string) => {
        state.updatedFormName = newFormName
    }

    const applyCurrentForm = () => {
        if ((state.currentForm && state.currentForm.name) && !state.updatedFormName) {
            state.updatedFormName = state.currentForm.name
        }
        if (state.updatedFormName) {
            const currentForm: CreatedForm = {
                name: state.updatedFormName,
                itemList: state.itemList
            }

            if (state.currentForm && state.currentForm.id) {
                eventBus.dispatch('onFormUpdate', { id: state.currentForm.id, value: { ...currentForm, id: state.currentForm.id } })
            } else {
                eventBus.dispatch('onFormAdd', currentForm)
            }
        }
    }

    // Return
    return {
        state: virtualState,
        onDrop,
        onDragEnter,
        onDragLeave,
        onDragStart,
        allowDrop,
        setSelectedItem,
        clearSelectedItem,
        setProperties,
        getProperties,
        removeItem,
        setProperty,
        setNewForm,
        updateCurrentFormName,
        applyCurrentForm
    }
}
