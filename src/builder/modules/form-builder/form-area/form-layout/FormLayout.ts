import { useDrag } from "@/builder/hooks/UseDrag"
import { useMessages } from "@/builder/hooks/UseMessages"

import FormItem from "../form-item/FormItem.vue"

export default {
    components: {
        FormItem
    },
    setup() {
        const { state, onDrop, allowDrop } = useDrag()
        const messages = useMessages('builderPage.layout')

        return {
            state,
            onDrop,
            allowDrop,
            messages
        }
    },
}