import { watch, ref } from "vue";

import Input from "../../../../components/input/Input.vue";
import Switch from "../../../../modules/global/switch/Switch.vue";
import Select from "../../../../components/select/Select.vue";
import OptionList from "../../../../components/option-list/OptionList.vue";

import { useDrag } from "../../../../hooks/UseDrag";
import { useMessages } from "../../../../hooks/UseMessages";

export enum Type {
  text = "Text",
  number = "Number",
  date = "Date",
  time = "Time",
  select = "Select",
  checkBox = "CheckBox",
}

export enum Size {
  half = "Half",
  full = "Full",
}

interface Value {
  id: number;
  value: string;
}

interface InputValues {
  header?: string;
  placeholder?: string;
  startingText?: string;
  values?: Value[];
  activeValue?: Value;
  size?: Size;
}

export default {
  components: {
    Input,
    Switch,
    Select,
    OptionList,
  },
  setup() {
    const { state, setProperty, getProperties } = useDrag();
    const messages = useMessages("builderPage.propertyField");

    // @ts-ignore
    const inputValues = ref<InputValues>(getProperties());

    // @ts-ignore
    watch(state, () => (inputValues.value = getProperties()));

    const setInputValue = (key: keyof InputValues, val: any) => {
      inputValues.value[key] = val;
      updateState(key, val);
    };

    const updateState = (key: keyof InputValues, val: any) => {
      setProperty(key, val);
    };

    return {
      state,
      inputValues,
      messages,
      setProperty,
      setInputValue,
    };
  },
};
