export interface Messages {
    mainPageMessages?: MainPageMessages;
    builderPageMessages?: BuilderPageMessages;
    defaultInputProperties?: DefaultInputProperties;
}

interface MainPageMessages {
    headerTitle?: string;
    headerDescription?: string;
    createNewOne?: string;
    yourForms?: string;
    notSetItemDescription?: string;
    editItem?: string;
    deleteItem?: string;
    addNewItem?: string;
}

interface BuilderPageMessages {
    header?: Header;
    layout?: Layout;
    inputField?: InputField;
    propertyField?: PropertyField;
    styleField?: StyleField;
    validationField?: ValidationField;
}

// Builder Page

interface Header {
    formName?: string;
    formInputPlaceholder?: string;
    saveFormButton?: string;
}

interface Layout {
    underConstructor?: string;
    dragDrop?: string;
    editButton?: string;
    deleteButton?: string;
}

interface ValidationField {

}

interface StyleField {

}

interface PropertyField {
    titleTitle?: string;
    titlePlaceholder?: string;
    placeholderTitle?: string;
    placeholderPlaceholder?: string;
    startingTextTitle?: string;
    startingTextPlaceholder?: string;
    inputSizeTitle?: string;
    inputSizeFull?: string;
    inputSizeHalf?: string;
    inputValuesTitle?: string;
    inputValuesItemTitle?: string;
    inputValuesItemPlaceholder?: string;
    inputValuesDeleteButton?: string;
    inputValuesAddButton?: string;
    notSelectAnyItem?: string;
}

interface InputField {
    textInput?: string;
    numberInput?: string;
    dateInput?: string;
    timeInput?: string;
    textAreaInput?: string;
    selectInput?: string;
    checkboxInput?: string;
}

// Inputs 

interface DefaultInputProperties {
    title?: string;
    placeholder?: string;
    checkboxPlaceholder?: string;
}