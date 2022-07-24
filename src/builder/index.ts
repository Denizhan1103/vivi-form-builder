import Builder from "./builder/Builder.vue"
import Parser from "./modules/parser/Parser.vue"

import { setLocale } from "./hooks/UseMessages"

export {
    setLocale,
    Builder,
    Parser
}

export default {
    // Todo fix typing
    install(Vue: any, options: any) {
        Vue.component('ViviBuilder', Builder)
        Vue.component('ViviParser', Parser)
    }
}
