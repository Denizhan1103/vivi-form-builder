import { useDrag } from "@/builder/hooks/UseDrag"

import FormItem from "../form-item/FormItem.vue"

export default {
    components: {
        FormItem
    },
    setup() {
        const { state, onDrop, allowDrop } = useDrag()

        return {
            state,
            onDrop,
            allowDrop
        }
    },
}