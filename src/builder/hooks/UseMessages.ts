import { inject } from "vue"

import DefaultMessages from "../constants/DefaultMessages"
import type { Options, AppState } from "../interfaces/AppState"

export const useMessages = (path?: string): any => {
    const { options } = inject('appState') as AppState
    return path ? seperatePath(options, path) : options.messages || {}
}

const seperatePath = (options: Options, path: string): any => {
    const seperatedPath = path.includes('.') ? path.split('.') : path
    // @ts-ignore
    return typeof seperatedPath == 'object' ? calculatePathObject(options, seperatedPath) : mergeWithDefault(options.messages[seperatedPath], DefaultMessages[seperatedPath])
}

const calculatePathObject = (options: Options, path: string[], currentObject: any = undefined, defaultObject?: any): any => {
    // @ts-ignore
    const _currentObject = currentObject ? currentObject[path[0]] : options.messages[path[0]]
    // @ts-ignore
    const _defaultObject = defaultObject ? defaultObject[path[0]] : DefaultMessages[path[0]]
    path.shift()

    return path.length > 0 ? calculatePathObject(options, path, _currentObject, _defaultObject) : mergeWithDefault(_currentObject, _defaultObject)
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