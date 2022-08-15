import { useMessages } from "../../hooks/UseMessages";
import { onMounted, ref, watch, type PropType } from "vue";
import type {
  Type,
  Properties,
  Style,
  Validation,
  ComponentProperties,
} from "../ComponentInterfaces";

export default {
  props: {
    type: {
      type: String as PropType<Type>,
      required: true,
    },
    properties: {
      type: Object as PropType<Properties>,
      required: false,
    },
    style: {
      type: Object as PropType<Style>,
      required: false,
      default: { header: {}, input: {}, validation: {} },
    },
    validation: {
      type: Object as PropType<Validation>,
      required: false,
      default: { enabled: false },
    },
  },
  setup(props: ComponentProperties, { emit }: any) {
    const inputText = ref<string>("");
    const messages = useMessages("defaultInputs");

    watch(props, () => {
      setInputText();
    });

    watch(inputText, (newValue: string) => {
      emit("onInputChanged", newValue);
    });

    const setInputText = () => {
      inputText.value =
        props.properties && props.properties.startingText
          ? props.properties.startingText
          : "";
    };

    onMounted(() => setInputText());

    return {
      inputText,
      messages,
    };
  },
};
