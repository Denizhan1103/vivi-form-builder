interface Form {
    id: number;
    name: string;
    description?: string;
    nameChangable?: boolean;
    deletable?: boolean;
    styleChangable?: boolean;
    validationChangable?: boolean;
    itemList: Item[];
}

interface SetForm {
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
    id: number;
    queue: number;
    type: ItemTypes;
    properties?: ItemProperties;
    style?: ItemStyles;
}

enum ItemTypes {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time',
    textArea = 'TextArea',
    select = 'Select',
    checkBox = 'CheckBox'
}

interface ItemProperties {
    startingText?: string;
    placeholder?: string;
    header?: string;
    size?: ItemSize;
    values?: Value[];
    activeValue?: Value;
}

interface Value {
    id: number;
    activeValue: string;
}

enum ItemSize {
    half = 'Half',
    full = 'Full'
}

interface ItemStyles {
    header: ItemHeaderStyles;
    input: ItemInputStyles;
    validation: ItemValidationStyles;
}

interface ItemHeaderStyles {

}

interface ItemInputStyles {

}

interface ItemValidationStyles {

}