import { inject, reactive } from "vue"

import DefaultMessages from "../constants/DefaultMessages"
import type { Options, AppState } from "../interfaces/AppState"
import type { Messages } from "../interfaces/Messages"

const customMessages = reactive<Messages>({})

export const useMessages = (path?: string): any => {
    return path ? seperatePath(customMessages, path) : customMessages || DefaultMessages
}

export const setLocale = (messages:Messages) => {
    Object.assign(customMessages,messages)
}
const seperatePath = (messages: Messages, path: string): any => {
    const seperatedPath = path.includes('.') ? path.split('.') : path
    // @ts-ignore
    return typeof seperatedPath == 'object' ? calculatePathObject(messages, seperatedPath) : mergeWithDefault(messages[seperatedPath], DefaultMessages[seperatedPath])
}

const calculatePathObject = (messages: Messages, path: string[], currentObject: any = undefined, defaultObject?: any): any => {
    // @ts-ignore
    const _currentObject = currentObject ? currentObject[path[0]] : messages[path[0]]
    // @ts-ignore
    const _defaultObject = defaultObject ? defaultObject[path[0]] : DefaultMessages[path[0]]
    path.shift()

    return path.length > 0 ? calculatePathObject(messages, path, _currentObject, _defaultObject) : mergeWithDefault(_currentObject, _defaultObject)
}

const mergeWithDefault = (currentObject: any, defaultObject: any) => {
    if (!currentObject) currentObject = {}
    if (!defaultObject) defaultObject = {}
    // @ts-ignore
    for (let defaultEntries of Object.entries(defaultObject)) {
        if (!currentObject[defaultEntries[0]]) currentObject[defaultEntries[0]] = defaultEntries[1]
    }
    return currentObject
}