export interface Messages {
  mainPage?: MainPage;
  builderPage?: BuilderPage;
  defaultInputs?: DefaultInputs;
  errorList?: ErrorList;
}

interface ErrorList {
  headerRequired?: string;
}

interface MainPage {
  headerTitle?: string;
  headerDescription?: string;
  createFormButton?: string;
  yourForms?: string;
  notSetFormDescription?: string;
  updateFormButton?: string;
  deleteFormButton?: string;
  addFormButton?: string;
  haveZeroForm?: string;
}

interface BuilderPage {
  header?: Header;
  layout?: Layout;
  fieldNames?: FieldNames;
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
  updateButton?: string;
  deleteButton?: string;
  addHere?: string;
}

interface FieldNames {
  inputs?: string;
  properties?: string;
  styles?: string;
  validations?: string;
}

interface ValidationField {}

interface StyleField {}

interface PropertyField {
  titleTitle?: string;
  titlePlaceholder?: string;
  placeholderTitle?: string;
  placeholderPlaceholder?: string;
  startingTextTitle?: string;
  startingTextPlaceholder?: string;
  startingItemTitle?: string;
  startingItemPlaceholder?: string;
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
  checkBoxInput?: string;
}

// Inputs

interface DefaultInputs {
  title?: string;
  placeholder?: string;
  validation?: string;
  checkboxPlaceholder?: string;
}
