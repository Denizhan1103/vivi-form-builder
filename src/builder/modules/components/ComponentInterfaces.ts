export enum Type {
    text = 'Text',
    number = 'Number',
    date = 'Date',
    time = 'Time'
}

export enum Size {
    half = 'Half',
    full = 'Full'
}

export interface InputStyle {
    color?: string;
    backgroundColor?: string;
    fontWeight?: number;
    fontSize?: string;
    height?: number;
}

export interface HeaderStyle {
    color?: string;
    backgroundColor?: string;
    fontWeight?: number;
    fontSize?: string;
}

export interface ValidationStyle {
    color?: string;
    backgroundColor?: string;
    fontWeight?: number;
    fontSize?: string;
}

export interface Style {
    input?: InputStyle;
    header?: HeaderStyle;
    validation?: ValidationStyle;
}

export interface Validation {
    enable?: boolean;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
    maxDate?: string;
    minDate?: string;
    maxTime?: string;
    minTime?: string;
}

export interface Properties {
    startingText?: string;
    placeholder?: string;
    header?: string;
    size?: Size;
}

export interface ComponentProperties {
    type: Type;
    style: Style;
    properties: Properties;
}
