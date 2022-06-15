import Builder from "./builder/Builder.vue"
import Parser from "./modules/parser/Parser.vue"

export default {
    // Todo fix typing
    install(Vue: any, options: any) {
        Vue.mixin({
            created() {
                Vue.component('ViviBuilder', Builder)
                Vue.component('ViviParser', Parser)
            }
        })
    }
}