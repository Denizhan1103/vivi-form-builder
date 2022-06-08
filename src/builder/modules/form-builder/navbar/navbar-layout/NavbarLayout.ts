import { ref } from "vue";

import NavbarHeader from "../navbar-header/NavbarHeader.vue"
import NavbarInput from "../navbar-input/NavbarInput.vue";

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
    components: {
        NavbarHeader,
        NavbarInput
    },
    setup() {

        const navbarHeaders: NavbarHeaders[] = [
            { type: NavbarHeaderNames.inputs, name: 'Inputs' },
            { type: NavbarHeaderNames.prototype, name: 'Prototype' },
            { type: NavbarHeaderNames.style, name: 'Style' },
            { type: NavbarHeaderNames.validation, name: 'Validation' }
        ]

        const selectedHeaderItem = ref<NavbarHeaderNames>(NavbarHeaderNames.inputs)

        return {
            navbarHeaders,
            NavbarHeaderNames,
            selectedHeaderItem
        }
    },
}