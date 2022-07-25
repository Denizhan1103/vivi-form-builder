import type { Messages } from "../interfaces/Messages";

const messages: Messages = {
  mainPage: {
    headerTitle: "Welcome to form builder",
    headerDescription: "You can create form how you want!",
    createFormButton: "Create New One",
    yourForms: "Your Forms",
    haveZeroForm: "You have 0 form!",
    notSetFormDescription: "Not set any description",
    updateFormButton: "Edit",
    deleteFormButton: "Delete",
    addFormButton: "Add New Item",
  },
  builderPage: {
    header: {
      formName: "Form Name",
      formInputPlaceholder: "Please write form name...",
      saveFormButton: "Save Current Form",
    },
    layout: {
      underConstructor: "Under The Constructor",
      dragDrop: "Drag & Drop Here",
      updateButton: "Edit",
      deleteButton: "Delete",
      addHere: "Add Here",
    },
    fieldNames: {
      inputs: "Inputs",
      properties: "Properties",
      styles: "Styles",
      validations: "Validation",
    },
    inputField: {
      textInput: "Text",
      numberInput: "Number",
      dateInput: "Date",
      timeInput: "Time",
      textAreaInput: "Text Area",
      selectInput: "Select",
      checkBoxInput: "Check Box",
    },
    propertyField: {
      titleTitle: "Title",
      titlePlaceholder: "Title...",
      placeholderTitle: "Placeholder",
      placeholderPlaceholder: "Placeholder...",
      startingTextTitle: "Starting Text",
      startingTextPlaceholder: "Starting Text...",
      startingItemTitle: "Starting Item",
      startingItemPlaceholder: "Starting Item...",
      inputSizeTitle: "Input Size",
      inputSizeFull: "Full",
      inputSizeHalf: "Half",
      inputValuesTitle: "Input Values",
      inputValuesItemTitle: "Value",
      inputValuesItemPlaceholder: "Value...",
      inputValuesDeleteButton: "Del",
      inputValuesAddButton: "Add New Value",
      notSelectAnyItem: "You Are Not Selected Any Item.",
    },
    styleField: {},
    validationField: {},
  },
  defaultInputs: {
    title: "Header Text",
    placeholder: "Placeholder...",
    checkboxPlaceholder: "Any option is not set",
    validation: "Under the constructor",
  },
  errorList: {
    headerRequired: "Header name is required!",
  },
};

export default messages;
