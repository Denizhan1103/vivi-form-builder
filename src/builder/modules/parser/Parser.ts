import { type PropType, ref, watch, reactive } from "vue";

import Input from "../../components/input/Input.vue";
import Select from "../../components/select/Select.vue";
import CheckBox from "../../components/check-box/CheckBox.vue";
import TextArea from "../../components/text-area/TextArea.vue";
import { useMessages } from "@/builder/hooks/UseMessages";

interface Form {
  id: number;
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
  type: ItemTypes;
  properties?: ItemProperties;
}

interface ItemProperties {
  startingText?: string;
  placeholder?: string;
  header?: string;
  size?: ItemSize;
  values?: { id: number; value: string }[];
  activeValue?: number;
}

enum ItemSize {
  half = "Half",
  full = "Full",
}

enum ItemTypes {
  text = "Text",
  number = "Number",
  date = "Date",
  time = "Time",
  textArea = "TextArea",
  select = "Select",
  checkBox = "CheckBox",
}

enum RenderType {
  form = "form",
  list = "list",
}

interface ComponentProperties {
  form: Form;
  startValues?: any;
  renderType?: RenderType;
}

export default {
  components: {
    Input,
    TextArea,
    Select,
    CheckBox,
  },
  props: {
    form: {
      type: Object as PropType<Form>,
      required: true,
    },
    startValues: {
      type: Object,
      required: false,
      default: {},
    },
    renderType: {
      type: String as PropType<RenderType>,
      required: false,
      default: RenderType.form,
    },
  },
  setup(componentProperties: ComponentProperties, { emit }: any) {
    const emittingObjects = reactive<any>({});
    const messages = useMessages("defaultInputs");

    watch(emittingObjects, (newValue: any) => {
      emit("onInputsUpdated", newValue);
    });

    watch(componentProperties, (newValue) => {
      Object.entries(newValue.startValues).forEach(([key, val]: any) => {
        emittingObjects[key] = val;
      });
    });

    const calculateValue = (item: Item) => {
      const startValueId = componentProperties.startValues[item.id];
      if (startValueId) {
        let _value = undefined;
        item.properties?.values?.forEach(({ id, value }) => {
          if (id == startValueId) _value = value;
        });
        if (_value) return _value;
      } else {
        if (
          item.properties &&
          item.properties.values &&
          item.properties.activeValue
        ) {
          let _value = undefined;
          item.properties.values.forEach(({ id, value }) => {
            if (id == item.properties?.activeValue) _value = value;
          });
          if (_value) return _value;
        }
      }
      return;
    };

    return {
      emittingObjects,
      messages,
      calculateValue,
      RenderType,
    };
  },
};
