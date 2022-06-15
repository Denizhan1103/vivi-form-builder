import { reactive } from "vue"

import { findParentNode } from "../utils/FindParentNode";

enum DataTransferKey {
    type = 'type',
    id = 'itemId'
}

// TODO: look
enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'Text Area'
}

interface State {
    itemList: Item[];
    currentForm?: Form;
    availableItemId: number;
    lastOveredItemId?: string;
    lastSelectedItemId?: number;
    layoutItemClassName: string;
    updatedFormName?: string;
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

export const state = reactive<State>({
    itemList: [],
    currentForm: undefined,
    availableItemId: 0,
    lastOveredItemId: undefined,
    lastSelectedItemId: undefined,
    layoutItemClassName: '',
    updatedFormName: undefined
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
        if (!overedLayoutItem && selectedLayoutItem) overedLayoutItem = { ...selectedLayoutItem, id: selectedLayoutItem.id + 1, type: selectedLayoutItem.type }

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
            state.itemList.push({ ...selectedLayoutItem, id: overedLayoutItem.id - 1, type: selectedLayoutItem.type })
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
        clearSelectedItem()
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

    // Remove
    const removeItem = (itemId: number) => {
        // Remove Item
        state.itemList.forEach((perItem: Item, index: number) => {
            if (perItem.id == itemId) state.itemList.splice(index, 1)
        })

        // Set new index
        state.itemList.forEach((perItem: Item) => {
            if (perItem.id > itemId) perItem.id--
        })

        sortAllItems()
        clearSelectedItem()
        state.availableItemId--
    }

    // Properties
    // TODO: refactor this code
    const setProperties = (itemProperty: ItemProperties) => {
        state.itemList.forEach((perItem: Item) => {
            if (perItem.id == state.lastSelectedItemId) perItem.properties = itemProperty
        })
    }

    const setProperty = (key: string, value: any) => {
        state.itemList.forEach((perItem: Item, index: number) => {
            // TODO: write an enum
            if (perItem.id == state.lastSelectedItemId) {
                if (!perItem.properties) perItem.properties = {}
                // @ts-ignore
                perItem.properties[key] = value
                // state.itemList[index].properties[key] = value
            }
        })
    }

    const findAvailableKeyValue = (values: { id: number, value: string }[]) => {
        let availableItemId = 1
        values.forEach((perItem) => {
            if (perItem.id >= availableItemId) availableItemId = perItem.id + 1
        })
        return availableItemId
    }

    // BENİ DÜZELT
    const setValueProperty = ({ type, newValue, key }: { type: 'Push' | 'Del' | 'Change', newValue?: string, key?: number }) => {
        state.itemList.forEach((perItem: Item, index) => {
            if (perItem.id == state.lastSelectedItemId) {
                if (!perItem.properties) perItem.properties = {}
                if (!perItem.properties.values) perItem.properties.values = []

                if (type == 'Push') {
                    const values = Object.assign([], perItem.properties.values)
                    values.push({ id: findAvailableKeyValue(perItem.properties.values), value: '' })
                    perItem.properties.values = values
                    // perItem.properties.values.push({ id: findAvailableKeyValue(perItem.properties.values), value: '' })

                }
                if (type == 'Del' && key) {
                    perItem.properties.values.forEach((item, index) => {
                        if (item.id == key) perItem.properties?.values?.splice(index, 1)
                    })
                }
                if (type == 'Change') {
                    perItem.properties.values.forEach((item) => {
                        if (item.id == key) item.value = newValue || ''
                    })
                }
            }
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

    const setNewForm = (form?: Form) => {
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
            if (perItem.id >= state.availableItemId) state.availableItemId = perItem.id + 1
        }) : state.availableItemId = 0
    }

    const updateCurrentFormName = (newFormName: string) => {
        state.updatedFormName = newFormName
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
        getProperties,
        removeItem,
        setProperty,
        setValueProperty,
        setNewForm,
        updateCurrentFormName
    }
}
