import Builder from "./modules/builder/Builder.vue"

export default {
    // Todo fix typing
    install(Vue: any, options: any) {
        Vue.mixin({
            created() {
                Vue.component('ViviBuilder', Builder)
            }
        })
    }
}