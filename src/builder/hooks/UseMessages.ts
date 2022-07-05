import { inject } from "vue"

import type { AppState } from "../interfaces/AppState"

export const useMessages = (path?: string): any => {
    const { options } = inject('appState') as AppState

    return path ? seperatePath(path) : options.messages
}

const seperatePath = (path: string): any => {
    const { options } = inject('appState') as AppState
    const seperatedPath = path.includes('.') ? path.split('.') : path

    // @ts-ignore
    return typeof seperatedPath == 'object' ? calculatePathObject(seperatedPath) : options.messages[seperatedPath] || undefined
}

const calculatePathObject = (path: string[], currentObject: any = undefined): any => {
    const { options } = inject('appState') as AppState
    // @ts-ignore
    const _currentObject = currentObject ? currentObject[path[0]] : options.messages[path[0]]
    path.shift()

    return path.length > 0 ? calculatePathObject(path, _currentObject) : _currentObject
}