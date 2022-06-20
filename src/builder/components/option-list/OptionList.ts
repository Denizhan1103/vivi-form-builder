import { computed } from "@vue/reactivity";
import { ref, watch, type PropType } from "vue";

import Input from "../input/Input.vue"

interface Value {
    id: number;
    value: string;
}

interface Properties {
    title?: string;
    options?: Value[];
}

interface ComponentProperties {
    properties: Properties;
}

export default {
    components: {
        Input
    },
    props: {
        properties: {
            type: Object as PropType<Properties>,
            required: false,
            default: { title: undefined, options: [] }
        }
    },
    setup(props: ComponentProperties, { emit }: any) {
        const optionList = ref(props.properties.options)

        // QUEUE
        const availableId = computed<number>(() => {
            let currentId = 1
            optionList.value?.forEach((perItem: Value) => {
                if (perItem.id >= currentId) currentId = perItem.id + 1
            })
            return currentId
        })

        watch(props, () => optionList.value = props.properties.options)

        watch(optionList, () => { emit('onOptionChanged', optionList.value) })

        return {
            optionList,
            availableId
        }
    },
}