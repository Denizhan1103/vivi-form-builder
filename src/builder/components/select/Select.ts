import { useMessages } from "../../hooks/UseMessages";
import { onMounted, ref, watch, type PropType } from "vue";

interface Validation {
  enabled: boolean;
}

interface Option {
  id: number;
  value: string;
}

interface ComponentProperties {
  properties: Properties;
  validation?: Validation;
}

interface Properties {
  header?: string;
  placeholder?: string;
  values?: Option[];
  activeValue?: number;
}

export default {
  props: {
    properties: {
      type: Object as PropType<Properties>,
      required: false,
      default: {
        header: undefined,
        placeholder: undefined,
        values: [],
        activeValue: undefined,
      },
    },
    validation: {
      type: Object as PropType<Validation>,
      required: false,
      default: { enabled: false },
    },
  },
  setup(props: ComponentProperties, { emit }: any) {
    const messages = useMessages("defaultInputs");

    const activeValue = ref<any>({ id: -1 });

    watch(activeValue, () => emit("onChange", activeValue.value));

    const onChange = (valueId: string) => {
      if (props.properties && props.properties.values) {
        props.properties.values.forEach((value: Option) => {
          if (String(value.id) == valueId) activeValue.value = { id: value.id };
        });
      }
    };

    watch(props, () => {
      if (props.properties.activeValue)
        activeValue.value = { id: props.properties.activeValue };
    });

    onMounted(() => {
      if (props.properties.activeValue) {
        activeValue.value = { id: props.properties.activeValue };
      }
    });

    return {
      onChange,
      activeValue,
      messages,
    };
  },
};
