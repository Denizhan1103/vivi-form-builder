interface SetStyleProperty {
    styles: any;
    key: string;
    value: string;
}

interface RemoveStyleProperty {
    styles: any;
    key: string;
}

export const setStyleProperty = ({ styles, key, value }: SetStyleProperty): any => {
    return styles[key] = value
}

export const removeStyleProperty = ({ styles, key }: RemoveStyleProperty): any => {
    return delete styles[key]
}

export const clearAllStyles = (): any => {
    return {}
}