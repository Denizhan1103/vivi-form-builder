import { ref } from "vue";

import NavbarHeader from "../navbar-header/NavbarHeader.vue"
import NavbarInput from "../navbar-input/NavbarInput.vue";
import NavbarProtoperty from "../navbar-protoperty/NavbarProtoperty.vue";
import NavbarStyle from "../navbar-style/NavbarStyle.vue";
import NavbarValidation from "../navbar-validation/NavbarValidation.vue";

enum NavbarHeaderNames {
    inputs = 'Inputs',
    protoperty = 'Protoperty',
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
        NavbarInput,
        NavbarProtoperty,
        NavbarStyle,
        NavbarValidation
    },
    setup() {

        const navbarHeaders: NavbarHeaders[] = [
            { type: NavbarHeaderNames.inputs, name: 'Inputs' },
            { type: NavbarHeaderNames.protoperty, name: 'Prototype' },
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