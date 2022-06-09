import type { PropType } from "vue";

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        keys: {
            type: Array as PropType<string[]>,
            required: true
        },
        activeKey: {
            type: String,
            required: true
        }
    },
    setup() {

    },
}