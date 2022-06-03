import { ref, reactive, computed, watch } from "vue"

export type InputType = "Text" | "Password" | "Date" | "Time" | "Number"
export type InputSize = "Full" | "Half" | "Flex" | undefined

type Rule = [string, number]
type SingleRule = [string]

interface InputValues {
    title: string;
    size: InputSize;
    type: InputType;
    placeholder: string;
    data: any;
    validation: Array<Rule | SingleRule> | undefined;
}

interface PropValues {
    placeholder: string;
    inputType: InputType;
    inputSize: InputSize;
    inputTitle: string;
    validation: Array<any> | undefined;
    startingData: string | undefined;
}

export default class StandardInputs {

    inputValues = reactive<InputValues>({
        title: "",
        size: "Flex",
        type: "Text",
        placeholder: "",
        data: "",
        validation: []
    })

    errorList = ref<Array<any>>([])

    componentProperties = ref()

    constructor(props: PropValues, emit: any) {
        this.componentProperties = computed(() => {
            return Object.assign({}, props)
        })

        this.setInputValues(this.componentProperties.value)

        watch(this.componentProperties, (newValue, oldValue) => {
            this.setInputValues(newValue)
        })

        watch(this.inputValues, (newValue, oldValue) => {
            this.itemWrited(emit, newValue.data)
        })
    }

    setInputValues(iNewValue: PropValues) {
        this.inputValues.title = iNewValue.inputTitle
        this.inputValues.type = iNewValue.inputType
        this.inputValues.placeholder = iNewValue.placeholder
        this.inputValues.validation = iNewValue.validation
        iNewValue.inputSize ? this.inputValues.size = iNewValue.inputSize : "Flex"
        if (iNewValue.startingData) this.inputValues.data = iNewValue.startingData
    }

    itemWrited(emit: any, iNewValue: string | number = this.inputValues.data) {
        // if (this.inputValues.validation) {
        //     const errors = new Validation(this.inputValues.validation, iNewValue).errorList
        //     if (errors.length > 0) {
        //         this.errorList.value = errors
        //         emit("itemError")
        //         return false
        //     }
        // }
        this.errorList.value = []
        emit("itemWrited", iNewValue)
    }
}

// let test = new Validation([["minLength",8],["maxLength",2],["empty"],["email"],["number"],["aloo"]],"Helloo").errorList
// console.log(test)