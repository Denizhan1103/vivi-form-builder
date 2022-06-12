import eventBus from "@/builder/utils/EventBus";
import { onMounted, onUnmounted, ref } from "vue";

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

interface NavbarHeader {
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

        const navbarHeaders = ref<NavbarHeader[]>([
            { type: NavbarHeaderNames.inputs, name: 'Inputs' },
            { type: NavbarHeaderNames.property, name: 'Property' },
            { type: NavbarHeaderNames.style, name: 'Style' },
            { type: NavbarHeaderNames.validation, name: 'Validation' }
        ])

        const selectedHeaderItem = ref<NavbarHeaderNames>(NavbarHeaderNames.inputs)

        const changeActiveNavbar = (item: NavbarHeaderNames) => {
            selectedHeaderItem.value = item
        }

        onMounted(() => {
            eventBus.on('changeActiveNavbar', changeActiveNavbar)
        })

        onUnmounted(() => {
            eventBus.remove('changeActiveNavbar', changeActiveNavbar)
        })

        return {
            navbarHeaders,
            NavbarHeaderNames,
            selectedHeaderItem,
            changeActiveNavbar
        }
    },
}