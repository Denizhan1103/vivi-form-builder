import type { PropType } from "vue";

enum NavbarHeaderNames {
    inputs = 'Inputs',
    prototype = 'Prototype',
    style = 'Style',
    validation = 'Validation'
}

interface NavbarHeaders {
    type: NavbarHeaderNames;
    name: string;
}


export default {
    props: {
        headerList: {
            type: Array as PropType<NavbarHeaders[]>,
            required: true
        },
        selectedHeaderItem: {
            type: String as PropType<NavbarHeaderNames>,
            required: true,
        }
    },
    setup() {

    },
}