import type { PropType } from "vue";

interface Accessor {
    name: string;
    accessor: string;
}

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        keys: {
            type: Array as PropType<Accessor[]>,
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