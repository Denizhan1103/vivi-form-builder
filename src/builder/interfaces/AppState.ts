import type { Messages } from "./Messages";

export enum CurrentPage {
    main = 'Main',
    builder = 'FormBuilder',
    componentTest = 'ComponentTest'
}

export interface AppState {
    currentPage: CurrentPage;
    options: Options;
}

export interface Options {
    newItemCreatable: boolean;
    formList: Form[];
    messages: Messages;
}

interface Form {
    id: number;
    name: string;
    description?: string;
    nameChangable?: boolean;
    canStyleChangable?: boolean;
    canValidationChangable?: boolean;
    itemList: Item[];
}

interface Item {
    id: number;
    type: ItemTypes;
    properties?: ItemProperties;
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
    values?: { id: number, value: string }[];
    activeValue?: { id: number; value: string };
}

enum ItemSize {
    half = 'Half',
    full = 'Full'
}
