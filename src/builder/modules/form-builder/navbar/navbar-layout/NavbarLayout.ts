import { useDrag } from "@/builder/hooks/UseDrag";
import eventBus from "@/builder/utils/EventBus";
import { computed } from "@vue/reactivity";
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

        const { state } = useDrag()

        const navbarHeaders = computed<NavbarHeader[]>(() => {
            const headers = [
                { type: NavbarHeaderNames.inputs, name: 'Inputs' },
                { type: NavbarHeaderNames.property, name: 'Property' },
            ]

            if (state.currentForm == undefined || state.currentForm?.canStyleChangable == true) headers.push({ type: NavbarHeaderNames.style, name: 'Style' })
            if (state.currentForm == undefined || state.currentForm?.canValidationChangable == true) headers.push({ type: NavbarHeaderNames.validation, name: 'Validation' })

            return headers
        })

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