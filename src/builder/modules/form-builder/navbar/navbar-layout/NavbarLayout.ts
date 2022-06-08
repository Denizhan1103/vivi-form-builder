import { ref } from "vue";

import NavbarHeader from "../navbar-header/NavbarHeader.vue"
import NavbarInput from "../navbar-input/NavbarInput.vue";
import NavbarProperty from "../navbar-property/NavbarProperty.vue";
import NavbarStyle from "../navbar-style/NavbarStyle.vue";
import NavbarValidation from "../navbar-validation/NavbarValidation.vue";

enum NavbarHeaderNames {
    inputs = 'Inputs',
    property = 'Property',
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
        NavbarProperty,
        NavbarStyle,
        NavbarValidation
    },
    setup() {

        const navbarHeaders = ref<NavbarHeaders[]>([
            { type: NavbarHeaderNames.inputs, name: 'Inputs' },
            { type: NavbarHeaderNames.property, name: 'Property' },
            { type: NavbarHeaderNames.style, name: 'Style' },
            { type: NavbarHeaderNames.validation, name: 'Validation' }
        ])

        const selectedHeaderItem = ref<NavbarHeaderNames>(NavbarHeaderNames.inputs)

        return {
            navbarHeaders,
            NavbarHeaderNames,
            selectedHeaderItem
        }
    },
}