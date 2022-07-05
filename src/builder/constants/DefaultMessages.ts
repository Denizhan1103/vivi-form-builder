import type { Messages } from "../interfaces/Messages";

const messages: Messages = {
    mainPageMessages: {
        headerTitle: 'Welcome to form builder',
        headerDescription: 'You can create form how you want!',
        createNewOne: 'Create New One',
        yourForms: 'Your Forms',
        notSetItemDescription: 'Not set any description',
        editItem: 'Edit',
        deleteItem: 'Delete',
        addNewItem: 'Add New Item'
    },
    builderPageMessages: {
        header: {
            formName: 'Form Name',
            formInputPlaceholder: 'Please write form name...',
            saveFormButton: 'Save Current Form'
        },
        layout: {
            underConstructor: 'Under The Constructor',
            dragDrop: 'Drag & Drop Here',
            editButton: 'Edit',
            deleteButton: 'Delete'
        },
        inputField: {
            textInput: 'Text',
            numberInput: 'Number',
            dateInput: 'Date',
            timeInput: 'Time',
            textAreaInput: 'Text Area',
            selectInput: 'Select',
            checkboxInput: 'Check Box'
        },
        propertyField: {
            titleTitle: 'Title',
            titlePlaceholder: 'Title...',
            placeholderTitle: 'Placeholder',
            placeholderPlaceholder: 'Placeholder...',
            startingTextTitle: 'Starting Text',
            startingTextPlaceholder: 'Starting Text...',
            inputSizeTitle: 'Input Size',
            inputSizeFull: 'Full',
            inputSizeHalf: 'Half',
            inputValuesTitle: 'Input Values',
            inputValuesItemTitle: 'Value',
            inputValuesItemPlaceholder: 'Value...',
            inputValuesDeleteButton: 'Del',
            inputValuesAddButton: 'Add New Value',
            notSelectAnyItem: 'You Are Not Selected Any Item.'
        },
        styleField: {},
        validationField: {}
    },
    defaultInputProperties: {
        title: 'Header Text',
        placeholder: 'Placeholder...',
        checkboxPlaceholder: 'Any option is not set'
    }
}

export default messages